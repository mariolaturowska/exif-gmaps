import React, {Component} from 'react';
import EXIF from 'exif-js';
import MyMapComponent from './googleMaps';
import Input from './input';
import ImageOne from './imageOne';

class ImageStorage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageArray: []
        }
    }

    //function to upload images with data
    imageUpload = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {

            EXIF.getData(file, (e) => {
                let long = EXIF.getTag(file, 'GPSLongitude');
                let lat = EXIF.getTag(file, 'GPSLatitude');

                let toDecimal = function (number) {
                    if (number === undefined) {
                        return null;
                    }
                    return number[0].numerator + number[1].numerator /
                        (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
                };
                if (toDecimal(lat) === '' || toDecimal(long) === '' || (file.size / 1000000 > 1) || file.name.substr(file.name.indexOf('.') + 1) !== 'JPG') {
                    return null;
                }

                this.setState({
                    imageArray: [...this.state.imageArray,
                        {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            latitude: toDecimal(lat),
                            longtitude: toDecimal(long),
                            base: base64
                        },
                    ]
                });
            });
        });
    };

    //event to delete photo on website

    removeHandler = (e) => {
        let element = e.currentTarget.parentElement.nextElementSibling.getAttribute('src');
        let elementList = this.state.imageArray.filter(e => {
            return e.base !== element;
        });

        this.setState({
            imageArray: elementList
        })
    };

    render() {

        if (!this.state.imageArray) {
            return null;
        }

        //rendering images and data on website
        this.elementList = this.state.imageArray.map((image, index) => {
            return (
                <ImageOne image={image} key={index} removeHandler={this.removeHandler}/>
            )
        });

        return (<main className='wrapper'>
                <section className='imageWrapper'>
                    <Input imageUpload={this.imageUpload}/>
                    <article className='elementList'>
                        {this.elementList}
                    </article>
                </section>
                <section className='mapComponent'>
                    <MyMapComponent
                        markers={this.state.imageArray}
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `100vh`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                    />
                </section>
            </main>
        );
    }
}

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

export default ImageStorage;