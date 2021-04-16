/**
 * External Dependencies
 */

import {DescCard} from "../../global-components/DescCard";

/**
 * WordPress dependencies
 */
const { filter, get } = lodash;

import {Component, Fragment} from "@wordpress/element";
import {BlockControls, MediaUpload, MediaPlaceholder, editorMediaUpload} from "@wordpress/block-editor";
import {Button, DropZone, Toolbar, withNotices} from "@wordpress/components";

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '../editor.scss';
import TwoUpImage from '../editor-image';

class Image2UpEditComponent extends Component {
    constructor() {
        super( ...arguments );

        this.onSelectImage = this.onSelectImage.bind( this );
        this.onSelectImages = this.onSelectImages.bind( this );
        this.onRemoveImage = this.onRemoveImage.bind( this );
        this.setImageAttributes = this.setImageAttributes.bind( this );
        this.addFiles = this.addFiles.bind( this );
        this.uploadFromFiles = this.uploadFromFiles.bind( this );

        this.state = {
            selectedImage: null,
        };
    }

    onSelectImage( index ) {
        return () => {
            if ( this.state.selectedImage !== index ) {
                this.setState( {
                    selectedImage: index,
                } );
            }
        };
    }

    onRemoveImage( index ) {
        return () => {
            const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
            const { columns } = this.props.attributes;
            this.setState( { selectedImage: null } );
            this.props.setAttributes( {
                images,
                columns: columns ? Math.min( images.length, columns ) : columns,
            } );
        };
    }

    onSelectImages( images ) {
        // WE USE LODASH'S 'GET' TO GO DEEPER TO GET THE PROVIDED LARGE SIZE URL
        images.map( (image) => {
            image.caption = [image.caption];
        });
        let imageData = images.map( ( image ) => ({
            ..._.pick( image, [ 'alt', 'caption', 'id' ] ),
            url: get( image, 'sizes["horiz__16x9--m"].url' )
        }));

        this.props.setAttributes( {
            images: imageData,
        } );
    }

    setImageAttributes( index, attributes ) {
        const { attributes: { images }, setAttributes } = this.props;
        if ( ! images[ index ] ) {
            return;
        }
        setAttributes( {
            images: [
                ...images.slice( 0, index ),
                {
                    ...images[ index ],
                    ...attributes,
                },
                ...images.slice( index + 1 ),
            ],
        } );
    }

    uploadFromFiles( event ) {
        this.addFiles( event.target.files );
    }

    addFiles( files ) {
        const currentImages = this.props.attributes.images || [];
        const { noticeOperations, setAttributes } = this.props;
        editorMediaUpload( {
            allowedType: 'image',
            filesList: files,
            onFileChange: ( images ) => {
                setAttributes( {
                    images: currentImages.concat( images ),
                } );
            },
            onError: noticeOperations.createErrorNotice,
        } );
    }

    defaultColumnsNumber( attributes ) {
        return Math.min( 3, attributes.images.length );
    }

    componentWillReceiveProps( nextProps ) {
        // Deselect images when deselecting the block
        if ( ! nextProps.isSelected && this.props.isSelected ) {
            this.setState( {
                selectedImage: null,
                captionSelected: false,
            } );
        }
    }

    render() {
        const { attributes, isSelected, className, noticeOperations, noticeUI } = this.props;
        const { images, columns = this.defaultColumnsNumber( attributes ) } = attributes;

        const dropZone = (
            <DropZone
                onFilesDrop={ this.addFiles }
            />
        );

        const controls = (
            <BlockControls>
                { !! images.length && (
                    <Toolbar>
                        <MediaUpload
                            onSelect={ this.onSelectImages }
                            type="image"
                            multiple
                            gallery
                            value={ images.map( ( img ) => img.id ) }
                            render={ ( { open } ) => (
                                <Button
                                    className={"components-toolbar__control"}
                                    label={ __( 'Edit Images', 'alps-gutenberg-blocks' ) }
                                    icon="edit"
                                    onClick={ open }
                                />
                            ) }
                        />
                    </Toolbar>
                ) }
            </BlockControls>
        );

        const header = (
            <DescCard
                title={"Image (2UP)"}
                hasText={true}
                hasImage={true}
                hasImages={true}
            />
        );

        if ( images.length === 0 ) {
            return (
                <Fragment>
                    { controls }
                    { header }
                    <MediaPlaceholder
                        icon="format-gallery"
                        className={ className }
                        labels={ {
                            title: __( 'Image (2up)', 'alps-gutenberg-blocks' ),
                            name: __( 'images', 'alps-gutenberg-blocks' ),
                        } }
                        onSelect={ this.onSelectImages }
                        accept="image/*"
                        type="image"
                        multiple
                        notices={ noticeUI }
                        onError={ noticeOperations.createErrorNotice }
                    />
                </Fragment>
            );
        }
        return (
            <Fragment>
                { controls }
                { noticeUI }
                <ul className={ className }>
                    { header }
                    { dropZone }
                    { images.map( ( img, index ) => (
                        <li className={"blocks-gallery-item"} key={ img.id || img.url }>
                            <TwoUpImage
                                url={ img.url }
                                alt={ img.alt }
                                id={ img.id }
                                isSelected={ isSelected && this.state.selectedImage === index }
                                onRemove={ this.onRemoveImage( index ) }
                                onSelect={ this.onSelectImage( index ) }
                                setAttributes={ ( attrs ) => this.setImageAttributes( index, attrs ) }
                                caption={ img.caption }
                            />
                        </li>
                    ) ) }
                </ul>
                <MediaUpload
                    onSelect={ this.onSelectImages }
                    accept="image/*"
                    type="image"
                    gallery
                    multiple
                    addToGallery
                    notices={ noticeUI }
                    onError={ noticeOperations.createErrorNotice }
                    value={ images.map( ( img ) => img.id ) }
                    render={ ( { open } ) => (
                        <div onClick={ open }>
                            <Button className={"select-images-button is-button is-default is-large"}>
                                Add / Edit Images
                            </Button>
                            <p><small><em>Please note: you can only have two images set at any one time.</em></small></p>
                        </div>
                    ) }
                />

            </Fragment>
        );
    }
}

export default withNotices( Image2UpEditComponent );