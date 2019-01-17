import React from 'react';
import Close from 'rmdi/lib/Close';

//component to render 1 image with data
class ImageOne extends React.Component {

    //event to delete photo on website
    removeHandler = (e) => {
        if (typeof this.props.removeHandler === 'function') {
            this.props.removeHandler(e);
        }
    };

    render() {
        const {image} = this.props;
        return (
            <div>
                <div>
                    <Close className='removeButton' size={36} onClick={this.removeHandler}
                    />
                    <p><span>tytuł: </span>{image.name}</p>
                    <p><span>rozszerzenie: </span>{image.type.substr(image.type.indexOf('/') + 1)}</p>
                    <p><span>size: </span>{image.size / 1000} kB</p>
                    <p><span>longtitude: </span>{image.longtitude}</p>
                    <p><span>latitude: </span>{image.latitude}</p>
                </div>
                <img src={`${image.base}`} height='70' width='70'/>
            </div>
        );
    }
};


export default ImageOne;
