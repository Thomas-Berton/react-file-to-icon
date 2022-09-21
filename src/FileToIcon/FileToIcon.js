import React from 'react'
import PropTypes from 'prop-types'
import './FileToIcon.css'

import icons from './jsons/icons.json'
import colors from './jsons/colors.json'

export const extensionToIcon = (ext) => {

    if (ext.length === 0) return null

    const extension = ext.replace('.', '').toString()

    if (icons[extension] !== undefined) {
        const colorHex = colors[icons[extension].color]
        const icon = require(`./icons/file_type_${extension}@3x.png`)
        return { colorHex: colorHex, icon: icon }
    } else {
        const keysArr = Object.keys(icons)
        const key = keysArr.find(k => {
            return icons[k] &&
                icons[k].syntaxes &&
                icons[k].syntaxes[0] &&
                icons[k].syntaxes[0].extensions &&
                (icons[k].syntaxes[0].extensions.indexOf(`.${extension}`) !== -1 || icons[k].syntaxes[0].extensions.indexOf(extension) !== -1)
        })

        if (key) {
            const colorHex = colors[icons[key].color]
            const icon = require(`./icons/file_type_${key}@3x.png`)
            return { colorHex: colorHex, icon: icon }
        } else {
            const defaultIcon = require('./icons/file_type_default@3x.png')
            return { colorHex: "#000000", icon: defaultIcon }
        }
    }
}

const FileToIcon = (props) => {

    const { ext, alt } = props

    const [iconObj, setIconObj] = React.useState(null)

    React.useEffect(() => {
        const newIconObj = extensionToIcon()
        setIconObj(newIconObj)
    }, [ext, extensionToIcon])

    const dom = iconObj && <div className='col'>
        <img alt={alt} src={iconObj.icon} />
        <span style={{ fontSize: '1rem', color: iconObj.colorHex }}>.{ext.replace('.', '').toString()}</span>
    </div>

    return <div className='wrapper'>{dom}</div>
}



FileToIcon.propTypes = {
    ext: PropTypes.string
};

FileToIcon.defaultProps = {
    ext: 'js'
};

export default FileToIcon;