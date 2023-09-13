import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Box from '@mui/material/Box'
import mapboxgl from 'mapbox-gl'
import * as React from 'react'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import Title from '../components/atoms/title/Title'
import theme from '../theme/hooks/CreateTheme'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import './styles/GeojsonMapStyle.css'

import { useNavigate, useParams } from 'react-router-dom'
import PaddyFieldProtectedApi from '../api/exclusive/PaddyFieldProtectedApi'
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal'
import ErrorModal from '../components/modals/ErrorModal'
import COLORS from '../theme/styles/Colors'
import HeadLine4 from '../components/atoms/typographies/HeadLine4'
import { useTranslation } from 'react-i18next'

mapboxgl.accessToken =
    'pk.eyJ1Ijoic29uYWx1Y2hpcnUiLCJhIjoiY2xqNWlnbTQzMGFyczNzcDA3eDlkd3hlbyJ9.msEPDOT-yIPKlTSYhDriZg'

export default function ViewPaddyFieldPage() {
    const navigate = useNavigate()
    const mapContainerRef = React.useRef(null)
    const drawControlRef = React.useRef(null)
    const [paddyField, setPaddyField] = React.useState(null)
    const [deleteConfirmModalVisibility, setDeleteConfirmModalVisibility] =
        React.useState(false)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const { id } = useParams()
    const { t } = useTranslation()

    React.useEffect(() => {
        PaddyFieldProtectedApi.getAsync(id)
            .then((res) => {
                setPaddyField(res.data.paddyField)

                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/satellite-v9',
                    center: [80.07669627476156, 7.126885465605],
                    zoom: 18,
                    attributionControl: false,
                })

                const draw = new MapboxDraw({
                    displayControlsDefault: false,
                    controls: {
                        polygon: false,
                        trash: false,
                        zoom: true,
                    },
                    defaultMode: 'simple_select',
                })

                map.addControl(draw)
                drawControlRef.current = draw

                draw.add({
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates:
                            res.data.paddyField.irrigatedMapContent.features[0]
                                .geometry.coordinates,
                    },
                    properties: {
                        stroke: '#fffff',
                        strokeOpacity: 1,
                        strokeWidth: 3,
                    },
                })

                draw.add({
                    geometry: {
                        coordinates:
                            res.data.paddyField.irrigatedMapContent.features[1]
                                .geometry.coordinates,
                        type: 'MultiLineString',
                    },
                    properties: {
                        stroke: '#00acf0',
                        strokeOpacity: 1,
                        strokeWidth: 3,
                    },
                    type: 'Feature',
                })

                return () => {
                    map.remove()
                }
            })
            .catch((err) => console.log(err))
    }, [])

    const deletePaddyFieldAsync = async () => {
        try {
            setIsLoading(true)
            setErrorModalVisibility(false)
            setDeleteConfirmModalVisibility(false)

            await PaddyFieldProtectedApi.deleteAsync(id)

            navigate('/paddyFieldDetails')
        } catch (err) {
            console.log(err)
            setErrorModalVisibility(true)
            setIsLoading(false)
        }
    }

    return (
        <>
            <Box sx={{ minHeight: 650 }}>
                <div>
                    <Title
                        backicon={true}
                        titleName="titles.paddyDrawing"
                        onClick={() => {
                            navigate('/paddyFieldDetails')
                        }}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 20,
                    }}
                >
                    {paddyField && (
                        <Card
                            sx={{
                                display: 'flex',
                                maxWidth: 1000,
                                border: '1px solid #03C988',
                                borderRadius: 3,
                                boxShadow:
                                    'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}
                        >
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.paddyFieldNameTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={paddyField.name}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.locationTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={paddyField.location.name}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.paddyTypeTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={paddyField.paddyType.name}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.slopeLevelTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={paddyField.slopeLevel.name}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.waterInLocationTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={paddyField.waterIn.name}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.waterOutLocationTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={paddyField.waterOut.name}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.areaTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={`${paddyField.acres.toFixed(
                                                2
                                            )} m²`}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.numberOfIrrigationsTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={
                                                paddyField.numberOfIrrigations
                                            }
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <HeadLine4
                                            text={t(
                                                'viewPaddyFieldPage.spaceBetweenIrrigationsTitle'
                                            )}
                                            color={COLORS.PRIMARY}
                                            fontWeight={
                                                theme.typography.fontWeightBold
                                                    .fontWeight
                                            }
                                        />
                                    </Grid>
                                    <Grid item>
                                        <HeadLine4
                                            text={`${paddyField.spaceBetweenIrrigations.toFixed(
                                                2
                                            )} m`}
                                            color={COLORS.BLACK}
                                            fontWeight={
                                                theme.typography
                                                    .fontWeightNormal.fontWeight
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div
                    style={{
                        marginLeft: 50,
                        marginRight: 50,
                        marginTop: 40,
                    }}
                >
                    <div ref={mapContainerRef} className="map-container"></div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 40,
                    }}
                >
                    <ContainedButton
                        title={'containedButtonTitles.deleteShape'}
                        color={theme.palette.white.main}
                        backgroundColor={theme.palette.error.main}
                        onClick={() => setDeleteConfirmModalVisibility(true)}
                        width={200}
                        height={50}
                        isLoading={isLoading}
                    />
                </div>
            </Box>

            {deleteConfirmModalVisibility && (
                <DeleteConfirmationModal
                    handleDelete={deletePaddyFieldAsync}
                    handleCancel={() => setDeleteConfirmModalVisibility(false)}
                />
            )}

            {errorModalVisibility && (
                <ErrorModal
                    handleCancel={() => setErrorModalVisibility(false)}
                />
            )}
        </>
    )
}
