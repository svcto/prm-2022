import { ColumnActionsMode, DefaultButton, IColumn, Panel, PanelType, PrimaryButton, SelectionMode, ShimmeredDetailsList, Stack, TextField } from "@fluentui/react";
import { useCallback, useEffect, useState } from "react";
import { PageToolBar } from "../../components/PageToolBar";
import { IBrand } from '@typesCustom'
import { createBrand, deleteBrand, listBrands, updateBrand } from "../../services/server";
import { MessageBarCustom } from "../../components/MessageBarCustom";
import React from "react";
import { PanelFooterContent } from "../../components/PanelFooterContent";
import { DetailsListOptions } from "../../components/DetailsListOptions";

export function BrandPage() {
    const [brand, setBrand] = useState<IBrand>({} as IBrand)
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [loading, setLoading] = useState(true);
    // const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');
    const [openPanel, setOpenPanel] = useState(false);

    const columns: IColumn[] = [
        {
            key: 'name',
            name: 'Nome da marca',
            fieldName: 'name',
            minWidth: 100,
            isResizable: false,
            columnActionsMode: ColumnActionsMode.disabled
        },
        {
            key: 'option',
            name: 'Opções',
            minWidth: 60,
            maxWidth: 60,
            isResizable: false,
            columnActionsMode: ColumnActionsMode.disabled,
            onRender: (item: IBrand) => (<DetailsListOptions onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item)} />)
        }
    ];

    function handleNew() {
        setOpenPanel(true);
        setBrand({
            name: ''
        })
    }

    function handleConfirmSave() {

        let result = null;

        if (brand.id) {
            result = updateBrand(brand);
        } else {
            result = createBrand(brand);
        }
        result.then(result => {
            console.log(result);
            if (brand.id) {
                const i = brands.findIndex(b => b.id == brand.id);
                brands[i] = { ...result.data };
            } else {
                setBrands([...brands, result.data]);
            }
            setMessageSuccess('Registro salvo com sucesso!');
            setTimeout(() => {
                setMessageSuccess('');
            }, 5000);
        }).catch(error => {
            setMessageError(error.message);
            setTimeout(() => {
                handleDemissMessageBar();
                console.log('ok');
            }, 10000)
        }).finally(() =>
            setOpenPanel(false))

    }

    function handleEdit(item: IBrand) {
        setBrand(item);
        setOpenPanel(true);
    }

    function handleDelete(item: IBrand) {
        if (item.id) {
            deleteBrand(item.id)
                .then(() => {
                    setBrands(brands.filter(b => b.id !== item.id));
                    setMessageSuccess('Registro excluído com sucesso!')
                    setTimeout(() => {
                        setMessageSuccess('');
                    }, 5000);
                })
                .catch((error => {
                    setMessageError(error.message);
                    setTimeout(() => {
                        handleDemissMessageBar();
                        console.log('ok');
                    }, 10000)
                }))
                .finally(() => { });
        } else {

        }
    }


    const onRenderFooterContent = (): JSX.Element => (
        <PanelFooterContent id={brand.id as number}
            loading={loading} onConfirm={handleConfirmSave}
            onDismiss={() => setOpenPanel(false)}></PanelFooterContent>

    );

    useEffect(() => {
        listBrands()
            .then(result => {
                if (result) {
                    setBrands(result.data);
                }
            })
            .catch(error => {
                setMessageError(error.message);
                setInterval(() => {
                    handleDemissMessageBar();
                    console.log('ok')
                }, 10000)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    function handleDemissMessageBar() {
        setMessageError('')
    }

    function handleDemissPanel() {
        setOpenPanel(false);
    }

    return (
        <div id="brand-page" className="main-content">
            <Stack horizontal={false}>
                <PageToolBar
                    currentPageTitle={"Marcas"}
                    loading={loading}
                    onNew={handleNew} />
                <MessageBarCustom
                    messageError={messageError}
                    messageSuccess={messageSuccess}
                    onDismiss={handleDemissMessageBar}
                ></MessageBarCustom>
                <div className="data-list">
                    <ShimmeredDetailsList
                        items={brands}
                        columns={columns}
                        setKey="set"
                        enableShimmer={loading}
                        selectionMode={SelectionMode.none} />
                </div>
            </Stack>
            <Panel className="panel-form"
                isOpen={openPanel}
                type={PanelType.medium}
                headerText="Cadastro de Marca"
                isFooterAtBottom={true}
                onDismiss={handleDemissPanel}
                onRenderFooterContent={onRenderFooterContent}>
                <p>Preencha TODOS os campos obrigatórios identificados por <span className="required">*</span></p>
                <Stack horizontal={false}
                    className="panel-form-content">
                    <TextField label="Nome da marca" required value={brand.name} onChange={event => setBrand({ ...brand, name: (event.target as HTMLInputElement).value })} />
                </Stack>
                {/* {JSON.stringify(brand)} */}
            </Panel>
        </div>
    )
}