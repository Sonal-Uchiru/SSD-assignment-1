import { Router } from 'express'

import userRoute from './UserRoute'
import categoryRoute from './CategoryRoute'
import aggrerianDivisionRoute from './AggrerianDivisionRoute'
import openingHourRoute from './OpeningHourRoute'
import notificationRoute from './NotificationRoute'
import researchPaperRoute from './ResearchPaperRoute'
import paddyFieldRoute from './PaddyFieldRoute'
import harvestPredictionRoute from './HarvestPredictionRoute'
import cultivationMethodRoute from './CultivationMethodRoute'
import soilTypeRoute from './SoilTypeRoute'
import slopeLevelRoute from './SlopeLevelRoute'
import paddyTypeRoute from './PaddyTypeRoute'
import waterInoutLocationRoute from './WaterInoutLocationRoute'
import cultivationMonthRoute from './CultivationMonthRoute'
import locationRoute from './LocationRoute'

import { USER_PROTECTED_API_V1 } from '../../constants/protected/UserProtectedApi'
import { CULTIVATION_METHOD_PROTECTED_API_V1 } from '../../constants/protected/CultivationMethodProtectedApi'
import { LOCATION_PROTECTED_API_V1 } from '../../constants/protected/LocationProtectedApi'
import { SOIL_TYPE_PROTECTED_API_V1 } from '../../constants/protected/SoilType'
import { WATER_INOUT_LOCATION_PROTECTED_API_V1 } from '../../constants/protected/WaterInoutLocationProtectedApi'
import { SLOPE_LEVEL_PROTECTED_API_V1 } from '../../constants/protected/SlopeLevelProtectedApi'
import { PADDY_TYPE_PROTECTED_API_V1 } from '../../constants/protected/PaddyTypeProtectedApi'
import { CATEGORY_PROTECTED_API_V1 } from '../../constants/protected/CategoryProtectedApi'
import { AGGRERIAN_DIVISION_PROTECTED_API_V1 } from '../../constants/protected/AggrerianDivisionProtectedApi'
import { OPENING_HOUR_PROTECTED_API_V1 } from '../../constants/protected/OpeningHourProtectedApi'
import { RESEARCH_PAPER_PROTECTED_API_V1 } from '../../constants/protected/ResearchPaperProtectedApi'
import { PADDY_FIELD_PROTECTED_API_V1 } from '../../constants/protected/PaddyFieldProtectedApi'
import { HARVEST_PREDICTION_PROTECTED_API_V1 } from '../../constants/protected/HarvestPredictionProtectedApi'
import { NOTIFICATION_PROTECTED_API_V1 } from '../../constants/protected/NotificationProtectedApi'
import { CULTIVATION_MONTH_PROTECTED_API_V1 } from '../../constants/protected/CultivationMonthProtectedApi'

const protectedRouter: Router = Router()

protectedRouter.use(USER_PROTECTED_API_V1.V0, userRoute)
protectedRouter.use(CATEGORY_PROTECTED_API_V1.V0, categoryRoute)
protectedRouter.use(
    AGGRERIAN_DIVISION_PROTECTED_API_V1.V0,
    aggrerianDivisionRoute
)
protectedRouter.use(OPENING_HOUR_PROTECTED_API_V1.V0, openingHourRoute)
protectedRouter.use(RESEARCH_PAPER_PROTECTED_API_V1.V0, researchPaperRoute)
protectedRouter.use(NOTIFICATION_PROTECTED_API_V1.V0, notificationRoute)
protectedRouter.use(PADDY_FIELD_PROTECTED_API_V1.V0, paddyFieldRoute)
protectedRouter.use(
    HARVEST_PREDICTION_PROTECTED_API_V1.V0,
    harvestPredictionRoute
)
protectedRouter.use(
    CULTIVATION_METHOD_PROTECTED_API_V1.V0,
    cultivationMethodRoute
)
protectedRouter.use(LOCATION_PROTECTED_API_V1.V0, locationRoute)
protectedRouter.use(SOIL_TYPE_PROTECTED_API_V1.V0, soilTypeRoute)
protectedRouter.use(
    WATER_INOUT_LOCATION_PROTECTED_API_V1.V0,
    waterInoutLocationRoute
)
protectedRouter.use(SLOPE_LEVEL_PROTECTED_API_V1.V0, slopeLevelRoute)
protectedRouter.use(
    CULTIVATION_MONTH_PROTECTED_API_V1.V0,
    cultivationMonthRoute
)
protectedRouter.use(PADDY_TYPE_PROTECTED_API_V1.V0, paddyTypeRoute)

export default protectedRouter
