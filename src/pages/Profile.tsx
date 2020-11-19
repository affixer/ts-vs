import Axios from 'axios'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from '../store'

import '../styles/profile.css'

interface UserData {
    name: string
    email: string
    gravatar: {
        about: string
        displayName: string
        location: string
        name: string
        thumbnail: string
    }
}

export default function Profile() {
    let [profile, setProfile] = React.useState<UserData | null>(null)
    let [status, setStatus] = React.useState<boolean | string>(false)
    let [imageSize, setImageSize] = React.useState<number>(250)
    const { token } = useSelector((state: RootState) => state.user)
    

    React.useEffect(() => {
        if (window.innerWidth <= 768)
            setImageSize(175)
    }, [])

    const getGravatar = async (tk: string | null) => {
        if (!tk) return null
        return new Promise<UserData>(async (resolve: any, reject: any) => {
            try {
                const { data } = await Axios({
                    method: 'GET',
                    url: '/api/user/profile',
                    headers: {
                        Authorization: `Bearer ${tk}`
                    }
                })
                resolve(data)
            } catch (err: any) {
                reject(err)
            }
        })
    }

    React.useEffect(() => {
        getGravatar(token).then((data: UserData | null) => {
            setStatus('loaded')
            if (!data) return
            setProfile(data)
        }).catch((err: any) => {
            setStatus('load_failed')
            toast.error(err.message)
        })
    }, [token])

    return <React.Fragment>
        {
            !status ? <React.Fragment>
                <div className="loader">
                    Hi! Loading...
                </div>
            </React.Fragment> : <div className="profile-page">
                <div className="profile-data">
                    <div className="picture">
                        <img src={`${profile?.gravatar.thumbnail}.png?s=${imageSize}`} alt={profile?.name ?? ''}/>
                    </div>
                    
                    <section>
                        <div className="header">
                            <span className="text">Bio</span>
                            <span className="line"></span>
                        </div>
                        <p dangerouslySetInnerHTML={{
                            __html: profile?.gravatar.about ?? ""
                        }}></p>
                    </section>

                    <section>
                        <div className="header">
                            <span className="text">About</span>
                            <span className="line"></span>
                        </div>
                        <p>
                            <i className="material-icons">location_city</i>
                            <span>{profile?.gravatar.location ?? "" }</span>
                        </p>
                    </section>
                </div>
            </div>
        }
    </React.Fragment>
}