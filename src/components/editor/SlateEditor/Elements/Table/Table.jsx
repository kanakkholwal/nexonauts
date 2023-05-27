import React from 'react';



const Table = ({attributes,children,element}) => {

    return (
        <table>
            <tbody {...attributes}>
                {children}
            </tbody>
        </table>
    )
}

export default Table;