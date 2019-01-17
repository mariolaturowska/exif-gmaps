import React from 'react';
import Button from '@material-ui/core/Button'

//component to render Input on website
class Input extends React.Component {

    //event to upload photo on website
    imageUpload = (e) => {
        if (typeof this.props.imageUpload === 'function') {
            this.props.imageUpload(e);
        }
    };

    render() {
        return (
            <div className='inputWrapper'>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    type="file"
                    id="raised-button-file"
                    name='imageFile'
                    onChange={this.imageUpload}/>
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Upload image
                    </Button>
                </label>
            </div>
        );
    }
};


export default Input;
