import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { translateText } from './store/actions'
import './App.css'

const CHUCK_API_URL = process.env.REACT_APP_CHUCK_NORRIS_API_URL

function App() {
    //Redux Hooks
    const data = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    console.log(data)
    //React Hooks
    const [norrisDixIt, setNorrisDixIt] = useState(null)
    const [norrisIcon, setNorrisIcon] = useState(null)
    const [norrisUrl, setNorrisUrl] = useState(null)
    const cookieAcceptStatus = window.localStorage.getItem('accept') || false
    const [acceptCookies, setAcceptCookies] = useState(cookieAcceptStatus)

    //React Cookie Hooks
    const [cookies, setCookie, removeCookie] = useCookies(null)

    useEffect(() => {
        console.log('useEffect')
    }, [])

    function onHandleSubmit() {
        axios
            .get(`${CHUCK_API_URL}`)
            .then(({ data }) => {
                setNorrisIcon(data.icon_url)
                setNorrisDixIt(data.value)
                setNorrisUrl(data.url)
                setCookie('data', {
                    value: data.value,
                    url: data.url,
                    icon: data.icon_url,
                })
                dispatch(
                    translateText({
                        text: data.value,
                    }),
                )
            })
            .catch(error => console.error(error))
    }
    const onHandleClear = () => {
        removeCookie('data')
    }

    const onHandleReload = () => {
        window.location.reload()
    }

    const onHandeleAcceptCookies = () => {
        setAcceptCookies(true)
        window.localStorage.setItem('accept', true)
    }

    return (
        <div
            className='App'
            style={{
                backgroundColor: 'black',
                width: '100vw',
                height: '100vh',
                margin: '0px',
                padding: '0px',
                boxSizing: 'border-box',
            }}>
            {!acceptCookies ? (
                <div
                    style={{
                        color: 'white',
                        width: '100vw',
                        height: '100vh',
                        zIndex: '999',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => onHandeleAcceptCookies()}>
                    {' '}
                    THIS SITE USE COOKIES, ACCEPT TO CONTINUE
                </div>
            ) : (
                <header
                    style={{
                        height: '10vh',
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            backgroundColor: 'orange',
                        }}>
                        <h1
                            style={{
                                margin: '0px',
                            }}>
                            Chuck Norris
                        </h1>
                        <h5
                            style={{
                                marginTop: '0px',
                                marginBottom: '0px',
                                color: 'black',
                            }}>
                            React - Hooks / React - Cookie / React - Redux -
                            Hooks
                        </h5>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '5px',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <div
                            style={{
                                width: 'calc(100%/3)',
                                color: 'white',
                                border: '2px solid orange',
                                padding: '5px',
                                textAlign: 'center',
                                borderBottomLeftRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                            onClick={() => onHandleSubmit()}>
                            RANDOM
                        </div>
                        <div
                            style={{
                                width: 'calc(100%/3)',
                                color: 'white',
                                border: '2px solid orange',
                                padding: '5px',
                                textAlign: 'center',
                                marginLeft: '5px',
                                marginRight: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                            onClick={() => onHandleReload()}>
                            RELOAD
                        </div>
                        <div
                            style={{
                                width: 'calc(100%/3)',
                                color: 'white',
                                border: '2px solid orange',
                                padding: '5px',
                                textAlign: 'center',
                                borderBottomRightRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                            onClick={() => onHandleClear()}>
                            RESET
                        </div>
                    </div>
                </header>
            )}
            <section
                style={{
                    height: '80vh',
                    margin: '0',
                    padding: '0',
                }}>
                <div
                    style={{
                        margin: '0',
                        padding: '0',
                        height: '40vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'start',
                        fontSize: '1.2em',
                    }}>
                    <h2
                        style={{
                            color: 'orange',
                        }}>
                        From API:
                    </h2>
                    {norrisDixIt ? (
                        <p
                            style={{
                                color: 'gray',
                                maxWidth: '90vw',
                                textAlign: 'center',
                                textJustify: 'auto',
                            }}>
                            {norrisDixIt}
                        </p>
                    ) : (
                        <p
                            style={{
                                fontSize: '1.1em',
                                color: 'red',
                                maxWidth: '90vw',
                                textAlign: 'center',
                                textJustify: 'auto',
                            }}>
                            No Data from API
                        </p>
                    )}
                    {norrisIcon && (
                        <a href={norrisUrl}>
                            <img src={norrisIcon} alt='Norris Icon' />
                        </a>
                    )}
                </div>
                <div
                    style={{
                        margin: '0',
                        padding: '0',
                        height: '40vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'start',
                        fontSize: '1.2em',
                    }}>
                    <h2
                        style={{
                            color: 'green',
                        }}>
                        From Cookies:
                    </h2>
                    {cookies.data ? (
                        <p
                            style={{
                                color: 'gray',
                                maxWidth: '90vw',
                                textAlign: 'center',
                                textJustify: 'auto',
                            }}>
                            {cookies.data.value}
                        </p>
                    ) : (
                        <p
                            style={{
                                fontSize: '1.1em',
                                color: 'red',
                                maxWidth: '90vw',
                                textAlign: 'center',
                                textJustify: 'auto',
                            }}>
                            No Data from Cookies
                        </p>
                    )}
                    {cookies.data && cookies.data.icon && (
                        <a href={cookies.data.url}>
                            <img src={cookies.data.icon} alt='Norris Icon' />
                        </a>
                    )}
                </div>
            </section>
            <footer
                style={{
                    margin: '0',
                    padding: '0',
                    position: 'absolute',
                    width: '100%',
                    bottom: '2px',
                    color: 'white',
                    opacity: '.6',
                }}>
                {data && data[0] && data[0].text && (
                    <p> The Lepe Translator: {data[data.length - 1].text} </p>
                )}
            </footer>
        </div>
    )
}

export default App
