import { useEffect, useState } from "react"

import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { filterNullValues } from "utils"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [params, setParams] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])
    const searchParams = new URLSearchParams(filterNullValues(params))
    useEffect(() => {
        fetch(`${apiUrl}/projects?${searchParams.toString()}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [params])
    return (
        <div>
            <SearchPanel params={params} users={users} setParams={setParams} />
            <List list={list} users={users} />
        </div>
    )
}