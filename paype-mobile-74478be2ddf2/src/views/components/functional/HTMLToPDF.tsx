import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import UserApis from '@models/api/paype/user/user.api';

interface IHTMLToPDF {
    url: string;
    button?: boolean;
}

interface ICreatePDF {
    html: string;
}

export const HTMLToPDF = ({ url, button = false }: IHTMLToPDF) => {
    const [data, setData] = useState({
        isLoading: true,
        filePath: '',
        html: ''
    })

    useEffect(() => {
        getHtmlFromApi()
    }, [])

    const getHtmlFromApi = async () => {
        try {
            let res = null
            res = await UserApis.getPdfTemplateFromUserService({ params: { url } })
            await createPDF({ html: res.data })
        } catch (err) {
            console.log(err)
        }
    }

    const createPDF = async ({ html }: ICreatePDF) => {
        const options = {
            html,
            fileName: 'test',
            directory: 'Documents',
        };
        const pdfRefs = await RNHTMLtoPDF.convert(options);
        const { filePath }: any = pdfRefs
        const newData = { ...data, html, filePath, isLoading: false }
        setData(newData)
        if (!button) {
            openPdf(newData)
        }
    };

    const openPdf = async (data: any) => {
        if (!data?.filePath) return null
        await FileViewer.open(data.filePath, { onDismiss: () => NavServiceUtils.goBack(), displayName: 'Test' })
            .then((res) => res)
            .catch((err) => console.log(err))
    }

    if (!button) return null
    return (
        <TouchableOpacity onPress={() => openPdf(data)} style={{}}>
            <Text>Open PDF</Text>
        </TouchableOpacity>
    );
};
