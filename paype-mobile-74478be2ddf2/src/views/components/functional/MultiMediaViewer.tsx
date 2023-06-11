import React from 'react';
import { Modal } from 'react-native';
import WebView from 'react-native-webview';


interface IDownload {
    isVisible: boolean;
    fileName: string;
    url: string;
    onClose: any
}

export const MultiMediaViewer = ({ isVisible, fileName, url, onClose }: IDownload) => {

    return (
        <>
            {isVisible && url ?
                <Modal animationType={'slide'} visible={isVisible} onRequestClose={onClose}>
                    <WebView
                        // source={{ uri: url }}
                        source={{ html: `<embed src="${url}" width="800px" height="2100px" />` }}
                        style={{ flex: 1 }}
                        originWhitelist={["*"]}
                    />
                </Modal>
                : null
            }
        </>
    )

}