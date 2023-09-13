import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Box from '@mui/material/Box'
import mapboxgl from 'mapbox-gl'
import * as React from 'react'
import ContainedButton from '../components/atoms/buttons/ContainedButton'
import Title from '../components/atoms/title/Title'
import theme from '../theme/hooks/CreateTheme'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import './styles/GeojsonMapStyle.css'
import { useNavigate, useParams } from 'react-router-dom'
import FurrowIrrigationService from '../api/services/FurrowIrrigationService'
import PaddyFieldProtectedApi from '../api/exclusive/PaddyFieldProtectedApi'
import { ExtractValueAndLabel } from '../utils/common/ValueLabelExtraction'
import { getRectangularShape } from '../utils/mapBox/ShapeConverter'
import {
    getWaterInOutEnumNumber,
    getWaterOutLocationByIn,
} from '../utils/common/WaterInOutLocation'
import SaveConfirmationModal from '../components/modals/SaveConfirmationModal'
import ErrorModal from '../components/modals/ErrorModal'
import SuccessModal from '../components/modals/SuccessModal'
import COLORS from '../theme/styles/Colors'
import HeadLine4 from '../components/atoms/typographies/HeadLine4'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { t } from 'i18next'

mapboxgl.accessToken =
    'pk.eyJ1Ijoic29uYWx1Y2hpcnUiLCJhIjoiY2xqNWlnbTQzMGFyczNzcDA3eDlkd3hlbyJ9.msEPDOT-yIPKlTSYhDriZg'

export default function DrawPaddyFieldToolPage() {
    const navigate = useNavigate()
    const { metaData } = useParams()
    const mapContainerRef = React.useRef(null)
    const drawControlRef = React.useRef(null)
    const [selectedPaddyField, setSelectedPaddyField] = React.useState()
    const [metadataJson, setMetadataJson] = React.useState()

    const [saveConfirmModalVisibility, setSaveConfirmModalVisibility] =
        React.useState(false)
    const [errorModalVisibility, setErrorModalVisibility] =
        React.useState(false)
    const [successModalVisibility, setSuccessModalVisibility] =
        React.useState(false)
    const [isShapeValid, setIsShapeValid] = React.useState(true)
    const [isInvalidMultipleShape, setIsInvalidMultipleShape] =
        React.useState(false)

    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setMetadataJson(JSON.parse(metaData))
        const map = new mapboxgl.Map({
            container: mapContainerRef.current ?? '',
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [80.07669627476156, 7.126885465605],
            zoom: 18,
            attributionControl: false,
        })

        const draw = new MapboxDraw({
            displayControlsDefault: true,
            controls: {
                polygon: true,
                trash: true,
                zoom: true,
                rectangular: true,
            },
            defaultMode: 'simple_select',
        })

        map.addControl(draw)
        drawControlRef.current = draw

        const updateArea = () => {
            setIsShapeValid(true)
            setIsInvalidMultipleShape(false)

            const data = draw.getAll()
            if (data.features.length > 0) {
                if (data.features.length == 1) {
                    const fieldRectagularShape = getRectangularShape(
                        data.features[0]
                    )

                    if (fieldRectagularShape == null) setIsShapeValid(false)
                    setSelectedPaddyField(fieldRectagularShape)
                } else {
                    setIsInvalidMultipleShape(true)
                }
            }
        }

        map.on('draw.create', updateArea)
        map.on('draw.delete', updateArea)
        map.on('draw.update', updateArea)

        return () => map.remove()
    }, [])

    const savePaddyFieldAsync = async () => {
        setIsLoading(true)
        setSaveConfirmModalVisibility(false)
        setErrorModalVisibility(false)
        setSuccessModalVisibility(false)

        const selectedLocation = ExtractValueAndLabel(metadataJson.location)
        const selectedPaddyType = ExtractValueAndLabel(metadataJson.paddyType)
        const selectedSlope = ExtractValueAndLabel(metadataJson.slope)
        const selectedWaterIn = ExtractValueAndLabel(metadataJson.waterIn)

        const waterOutLocation = getWaterOutLocationByIn(selectedWaterIn.label)
        const selectedWaterOut = ExtractValueAndLabel(waterOutLocation)

        const request = {
            metaData: {
                paddyType: selectedPaddyType.label,
                slope: selectedSlope.label,
                location: selectedLocation.label,
                waterIn: getWaterInOutEnumNumber(selectedWaterIn.label),
                waterOut: getWaterInOutEnumNumber(selectedWaterOut.label),
            },
            feature: {
                type: 'FeatureCollection',
                features: [selectedPaddyField],
            },
        }

        try {
            const response =
                await FurrowIrrigationService.generateFurrowIrrigationPathsAsync(
                    request
                )

            const data = {
                name: metadataJson.name,
                location: selectedLocation.value,
                paddyType: selectedPaddyType.value,
                slopeLevel: selectedSlope.value,
                waterIn: selectedWaterIn.value,
                waterOut: selectedWaterOut.value,
                acres: response.data.metaData.area,
                mapContent: {
                    type: 'FeatureCollection',
                    features: [selectedPaddyField],
                },
                irrigatedMapContent: {
                    type: 'FeatureCollection',
                    ...response.data.feature,
                },
                numberOfIrrigations: response.data.metaData.numberOfIrrigations,
                spaceBetweenIrrigations:
                    response.data.metaData.spaceBetweenIrrigations,
            }

            const response2 = await PaddyFieldProtectedApi.saveAsync(data)
            setSuccessModalVisibility(true)
            setIsLoading(false)

            navigate(`/viewPaddyFieldDrawing/${response2.data.id}`)
        } catch (err) {
            console.log(err)
            setErrorModalVisibility(true)
            setIsLoading(false)
        }
    }

    const ToolTipHelpInfo = (
        <div>
            <strong>1.</strong> {t('drawPaddyField.helpToolTip.point1')}
            <br />
            <strong>2.</strong> {t('drawPaddyField.helpToolTip.point2')}
            <br />
            <strong>3.</strong> {t('drawPaddyField.helpToolTip.point3')}
            <br />
            <strong>4.</strong> {t('drawPaddyField.helpToolTip.point4')}
            <br />
            <strong>5.</strong> {t('drawPaddyField.helpToolTip.point5')}
        </div>
    )

    return (
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
                    marginTop: 25,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {!isShapeValid && (
                    <HeadLine4
                        text={t('drawPaddyField.invalidShape')}
                        color={COLORS.ERROR}
                    />
                )}

                {isInvalidMultipleShape && (
                    <HeadLine4
                        text={t('drawPaddyField.multipleShapeInvalid')}
                        color={COLORS.ERROR}
                    />
                )}

                <Tooltip title={ToolTipHelpInfo}>
                    <HelpOutlineIcon />
                </Tooltip>
            </div>

            <div style={{ marginLeft: 50, marginRight: 50, marginTop: 50 }}>
                <div ref={mapContainerRef} className="map-container"></div>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 40,
                            marginBottom: 40,
                        }}
                    >
                        <ContainedButton
                            title={'containedButtonTitles.save'}
                            color={theme.palette.white.main}
                            backgroundColor={theme.palette.primary.main}
                            onClick={() => setSaveConfirmModalVisibility(true)}
                            width={180}
                            height={45}
                            isLoading={isLoading}
                            isDisabled={!isShapeValid || isInvalidMultipleShape}
                        />
                    </div>
                </div>
            </div>

            {saveConfirmModalVisibility && (
                <SaveConfirmationModal
                    handleCancel={() => setSaveConfirmModalVisibility(false)}
                    handleSave={savePaddyFieldAsync}
                />
            )}

            {errorModalVisibility && (
                <ErrorModal
                    handleCancel={() => setErrorModalVisibility(false)}
                />
            )}

            {successModalVisibility && (
                <SuccessModal
                    handleCancel={() => setSuccessModalVisibility(false)}
                />
            )}
        </Box>
    )
}
