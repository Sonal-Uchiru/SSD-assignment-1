import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import theme from '../../../theme/hooks/CreateTheme'
import Avatar from '@mui/material/Avatar'
import ContainedButton from '../../atoms/buttons/ContainedButton'
import HeadLine4 from '../../atoms/typographies/HeadLine4'
import Paragraph from '../../atoms/typographies/Paragraph'

interface IProps {
    handleCancel(): void
    researchPaper: any
}

export default function SummarizedContentPreviewModal({
    handleCancel,
    researchPaper,
}: IProps) {
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={true}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={true}>
                    <Box sx={styles.box}>
                        <div style={{ textAlign: 'center', marginTop: -15 }}>
                            <HeadLine4
                                text={'Summarized Content Preview'}
                                color={theme.palette.primary.main}
                            />
                        </div>
                        <div style={styles.images}>
                            <Avatar
                                alt="Research Image"
                                src="./images/analysis.png"
                                style={{
                                    marginTop: 20,
                                    width: 80,
                                    height: 80,
                                    objectFit: 'contain',
                                }}
                                variant="rounded"
                            />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <HeadLine4
                                text={researchPaper?.topic}
                                color={theme.palette.black.main}
                            />
                        </div>
                        <div style={{ textAlign: 'justify', marginTop: 30 }}>
                            <Paragraph
                                text={researchPaper?.summerizedContent}
                                color={theme.palette.black.main}
                            />
                        </div>

                        <div
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'flex',
                                marginTop: 30,
                            }}
                        >
                            <ContainedButton
                                title={'containedButtonTitles.cancel'}
                                color={theme.palette.white.main}
                                backgroundColor={theme.palette.neutral.main}
                                onClick={handleCancel}
                                width={100}
                            />
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

const styles = {
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: theme.palette.white.main,
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxWidth: 650,
        maxHeight: 600,
        overflowY: 'auto',
        // Add scrollbar styling
        scrollbarWidth: 'thin', // Firefox
        scrollbarColor: 'rgba(0, 0, 0, 0.2) transparent', // Firefox
        '&::-webkit-scrollbar': {
            width: '3px', // Width of the scrollbar
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent', // Background color of the track
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.2)', // Color of the thumb
            borderRadius: '3px', // Roundness of the thumb
        },
    },

    button: {
        marginTop: 40,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    images: {
        justifyContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        marginBottom: 10,
    },
}
