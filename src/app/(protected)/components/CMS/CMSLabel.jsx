import React from 'react'

const CMSLabel = ({labelText = ""}) => {
    return (
        <div className="mb-3 text-sm text-gray-400">
            {labelText}
        </div>
    )
}

export default CMSLabel;