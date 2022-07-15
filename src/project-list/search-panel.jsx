

export const SearchPanel = ({ params, users, setParams }) => {

    return (
        <form >
            <div>
                <input type="text" placeholder="项目名" value={params.name} onChange={evt => setParams({
                    ...params,
                    name: evt.target.value
                })} />
                <select value={params.personId} onChange={evt => setParams({
                    ...params,
                    personId: evt.target.value
                })}>
                    <option value={''}>负责人</option>
                    {
                        users.map(user => (
                            <option value={user.id} key={user.id}>{user.name}</option>
                        ))
                    }
                </select>
            </div>
        </form>
    )
}