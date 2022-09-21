import React from 'react'
import PropTypes from 'prop-types'

import FileToIcon from '../FileToIcon/FileToIcon'

const FileToIconDemo = () => {

    const [inputVal, setInputVal] = React.useState('')
    const [ext, setExt] = React.useState('js')

    const submitExt = React.useCallback(() => {
        if (inputVal)
            setExt(inputVal)
    })

    return <>
        <FileToIcon ext={ext} alt={"logo"} />
        <div>
            <input type={'text'} onChange={(e) => setInputVal(e.target.value)} onKeyUp={(e) => { if (e.code == 'Enter') submitExt() }} />
            <button onClick={() => submitExt()}>Try</button>
        </div>
    </>
}



FileToIconDemo.propTypes = {
    ext: PropTypes.string
};

FileToIconDemo.defaultProps = {
    ext: 'js'
};

export default FileToIconDemo;

