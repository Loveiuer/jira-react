import { select } from 'utils'

export const List = ({ list, users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map(item => {
                        item = select(item, users)
                        return (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.personName}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}