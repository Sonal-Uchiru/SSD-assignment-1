import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import theme from '../../theme/hooks/CreateTheme'
import HeadLine3 from '../atoms/typographies/HeadLine3'
import ParagraphBold from '../atoms/typographies/ParagraphBold'
import Avatar from '@mui/material/Avatar'
import ContainedButton from '../atoms/buttons/ContainedButton'

interface IProps {
    handleCancel(): void
    handleSave(): void
}

export default function SaveConfirmationModal({
    handleCancel,
    handleSave,
}: IProps) {
    return (
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
                    <div style={styles.images}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/LocalImages%2FWarning.png?alt=media&token=dcc0e9f3-458b-4a30-93bf-c6e949ed583d"
                            style={{
                                width: 120,
                                height: 120,
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                    <HeadLine3
                        text={'saveConfirmationModal.title'}
                        color={theme.palette.warning.main}
                    />

                    <ParagraphBold
                        text={'saveConfirmationModal.subText'}
                        color={theme.palette.warning.main}
                    />
                    <div
                        style={styles.button}
                        className="btn-toolbar"
                        role="toolbar"
                        aria-label="Toolbar with button groups"
                    >
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="First group"
                            style={styles.buttonGroup}
                        >
                            <ContainedButton
                                title={'containedButtonTitles.save'}
                                color={theme.palette.white.main}
                                backgroundColor={theme.palette.warning.main}
                                onClick={handleSave}
                            />
                        </div>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Third group"
                            style={styles.buttonGroup2}
                        >
                            <ContainedButton
                                title={'containedButtonTitles.cancel'}
                                color={theme.palette.white.main}
                                backgroundColor={theme.palette.neutral.main}
                                onClick={handleCancel}
                            />
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
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
        textAlign: 'center',
        borderRadius: 2,
        maxWidth: 400,
    },

    button: {
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    buttonGroup2: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },

    buttonGroup: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },

    images: {
        justifyContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        marginBottom: 10,
    },
}
