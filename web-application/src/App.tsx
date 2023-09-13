import { ThemeProvider } from '@mui/material'
import * as React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AgrivoAppBar from './components/organisms/navigations/AppBar'
import DrawPaddyFieldToolPage from './pages/DrawPaddyFieldToolPage'
import FinalizedTimeSchedulePage from './pages/FinalizedTimeSchedulePage'
import ForgotPasswordPage from './pages/ForgotPassordPage'
import LoginAndRegisterPage from './pages/LoginAndRegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import PaddyFieldDetailsPage from './pages/PaddyFieldDetailsPage'
import PriorityDistributionSchedulePage from './pages/PriorityDistributionSchedulePage'
import PriorityDistributionScheduleStepsPage from './pages/PriorityDistributionScheduleStepsPage'
import ResearchFindingsPage from './pages/ResearchFindingsPage'
import ViewPaddyFieldPage from './pages/ViewPaddyFieldPage'
import { Private } from './private/PrivateRoute'
import theme from './theme/hooks/CreateTheme'
import Footer from './components/organisms/navigations/Footer'
import { UserRoles } from './types/enums/UserRoles'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <React.Suspense fallback="loading">
                    <Routes>
                        <Route path="/" element={<LoginAndRegisterPage />} />
                        <Route
                            path="/forgotPassword"
                            element={<ForgotPasswordPage />}
                        />

                        {/* Furrow Irrigation */}

                        <Route
                            path="/paddyFieldDetails"
                            element={
                                <>
                                    <AgrivoAppBar />
                                    <Private
                                        Component={PaddyFieldDetailsPage}
                                        Role={UserRoles.Farmer}
                                    />
                                </>
                            }
                        />

                        <Route
                            path="/paddyFieldDrawingTool/:metaData"
                            element={
                                <>
                                    <AgrivoAppBar />
                                    <Private
                                        Component={DrawPaddyFieldToolPage}
                                        Role={UserRoles.Farmer}
                                    />
                                </>
                            }
                        />

                        <Route
                            path="/viewPaddyFieldDrawing/:id"
                            element={
                                <>
                                    <AgrivoAppBar />
                                    <Private
                                        Component={ViewPaddyFieldPage}
                                        Role={UserRoles.Farmer}
                                    />
                                </>
                            }
                        />

                        {/* Research Disseminating */}

                        <Route
                            path="/researchDisseminating"
                            element={
                                <>
                                    <AgrivoAppBar />
                                    <Private
                                        Component={ResearchFindingsPage}
                                        Role={UserRoles.Officer}
                                    />
                                </>
                            }
                        />

                        {/* Priority Distribution  */}

                        <Route
                            path="/priorityDistribution"
                            element={
                                <>
                                    <AgrivoAppBar />
                                    <Private
                                        Component={
                                            PriorityDistributionScheduleStepsPage
                                        }
                                        Role={UserRoles.Officer}
                                    />
                                </>
                            }
                        />

                        <Route
                            path="/priorityDistributionSchedule"
                            element={
                                <>
                                    <AgrivoAppBar />
                                    <Private
                                        Component={
                                            PriorityDistributionSchedulePage
                                        }
                                        Role={UserRoles.Officer}
                                    />
                                </>
                            }
                        />

                        <Route
                            path="/finalizedTimeSchedule"
                            element={
                                <>
                                    <AgrivoAppBar />
                                    <Private
                                        Component={FinalizedTimeSchedulePage}
                                        Role={UserRoles.Officer}
                                    />
                                </>
                            }
                        />

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </React.Suspense>
                <Footer />
            </Router>
        </ThemeProvider>
    )
}

export default App
