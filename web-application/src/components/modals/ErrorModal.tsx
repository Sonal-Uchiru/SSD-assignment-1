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
}

export default function ErrorModal({ handleCancel }: IProps) {
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
                            src="https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/LocalImages%2FError.png?alt=media&token=4383d69c-dbf8-442c-ae91-eb2f0fa77998"
                            sx={{ width: 100, height: 100 }}
                        />
                    </div>
                    <HeadLine3
                        text={'errorModal.title'}
                        color={theme.palette.error.main}
                    />

                    <ParagraphBold
                        text={'errorModal.subText'}
                        color={theme.palette.error.main}
                    />
                    <div style={styles.button}>
                        <ContainedButton
                            title={'containedButtonTitles.tryAgain'}
                            color={theme.palette.white.main}
                            backgroundColor={theme.palette.error.main}
                            onClick={handleCancel}
                        />
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
    },

    button: {
        marginTop: 30,
    },

    images: {
        justifyContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        marginBottom: 10,
    },
}
