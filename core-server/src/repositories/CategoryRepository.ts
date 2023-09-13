import Cache from '../cache/Config'
import Category from '../models/Category'
import SubCategory from '../models/SubCategory'
import { QueryParams } from '../types/QueryParams'
import { CreateCategoryCommand } from '../types/category/v1/command/create/CreateCategoryCommand'
import { ICategory } from '../types/interfaces/models/ICategoryModel'
import { ISubCategory } from '../types/interfaces/models/ISubCategoryModel'
import { GetObjectID } from '../utils/extension/MongooseExtenstion'
import { UpdateFarmerFavouriteCategoryCommand } from '../types/farmer_favourite_category/v1/command/update/UpdateFarmerFavouriteCategoryCommand'
import { IFarmerFavouriteCategory } from '../types/interfaces/models/IFarmerFavouriteCategory'
import FarmerFavouriteCategory from '../models/FarmerFavouriteCategory'

class CategoryRepository {
    async SaveAsync(newCategory: CreateCategoryCommand): Promise<ICategory> {
        const options = { ordered: true }
        const category = await new Category({
            name: newCategory.name,
            iconUrl: newCategory.iconUrl,
        }).save()

        newCategory.subCategories.forEach(
            (item: any) => (item.category = GetObjectID(category._id))
        )

        await SubCategory.insertMany(newCategory.subCategories, options)

        await this.forceUpdateCategoryListAsync(new QueryParams(100, 0, 'asc'))
        await this.forceUpdateSubCategoryListByIdAsync(
            category._id,
            new QueryParams(100, 0, 'asc')
        )

        return category
    }

    async AnyAsync(id: string): Promise<ICategory> {
        return await Category.findOne(
            { _id: id, isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async AnySubCategoryAsync(id: string): Promise<ISubCategory> {
        return await SubCategory.findOne(
            { _id: id, isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async GetListAsync(queries: QueryParams): Promise<ICategory[]> {
        let categoryList: ICategory[] = Cache.nodeCache.get('categoryList')

        if (categoryList) {
            return categoryList
        }

        categoryList = await this.forceUpdateCategoryListAsync(queries)

        return categoryList
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await Category.find({ isDeleted: null }, { _id: 1 })).length
    }

    async GetSubCategoryListByIdAsync(
        id: string,
        queries: QueryParams
    ): Promise<ISubCategory[]> {
        let subCategoryList: ISubCategory[] = Cache.nodeCache.get(
            `subCategoryList-${id}`
        )

       if (subCategoryList) {
            return subCategoryList
        }

        subCategoryList = await this.forceUpdateSubCategoryListByIdAsync(
            id,
            queries
        )

        return subCategoryList
    }

    async GetSubCategoryListTotalCountByIdAsync(id: string): Promise<number> {
        return (
            await SubCategory.find({ isDeleted: null }, { _id: 1 }).where({
                category: GetObjectID(id),
            })
        ).length
    }

    async UpdateFarmerFavouriteCategoryByIdAsync(
        farmerFavourite: UpdateFarmerFavouriteCategoryCommand
    ): Promise<IFarmerFavouriteCategory> {
        const farmerFavouriteCategory =
            await FarmerFavouriteCategory.findOne().where({
                category: GetObjectID(farmerFavourite.category),
                user: GetObjectID(farmerFavourite.user),
            })

        if (!farmerFavouriteCategory) {
            return await new FarmerFavouriteCategory({
                ...farmerFavourite,
            }).save()
        }

        if (farmerFavouriteCategory.isDeleted == null) {
            await FarmerFavouriteCategory.findByIdAndUpdate(
                farmerFavouriteCategory._id,
                {
                    $set: {
                        isDeleted: new Date(),
                    },
                }
            )
        } else {
            await FarmerFavouriteCategory.findByIdAndUpdate(
                farmerFavouriteCategory._id,
                {
                    $set: {
                        isDeleted: null,
                    },
                }
            )
        }

        return farmerFavouriteCategory
    }

    async GetUserFavouriteCategoriesByUserIdAsync(
        userId: string
    ): Promise<IFarmerFavouriteCategory[]> {
        return await FarmerFavouriteCategory.find(
            { isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .populate('category', { _id: 1, name: 1, iconUrl: 1 })
            .where({
                user: GetObjectID(userId),
            })
    }

    private async forceUpdateCategoryListAsync(
        queries: QueryParams
    ): Promise<ICategory[]> {
        const categoryList = await Category.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set('categoryList', categoryList)

        return categoryList
    }

    private async forceUpdateSubCategoryListByIdAsync(
        id: string,
        queries: QueryParams
    ): Promise<ISubCategory[]> {
        const subCategoryList = await SubCategory.find(
            {
                isDeleted: null,
            },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .where({
                category: GetObjectID(id),
            })
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ name: queries.sort })

        Cache.nodeCache.set(`subCategoryList-${id}`, subCategoryList)

        return subCategoryList
    }
}

export default new CategoryRepository()
