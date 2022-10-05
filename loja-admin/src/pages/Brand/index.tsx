import { ColumnActionsMode, IColumn, Panel, PanelType, ShimmeredDetailsList, Stack, TextField } from "@fluentui/react";
import { MouseEvent, useEffect, useState } from "react";
import { PageToolBar } from "../../components/PageToolBar";
import { IBrand } from '@typesCustom'
import { listBrands } from "../../services/server";
import { MessageBarCustom } from "../../components/MessageBarCustom";

export function BrandPage() {
    const [brand, setBrand] = useState<IBrand>({} as IBrand)
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
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
        }
    ];

    function handleNew() {
        setOpenPanel(true);
        setBrand({
            name: ''
        })
    }

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
                        enableShimmer={loading} />
                </div>
            </Stack>
            <Panel className="panel-form"
                isOpen={openPanel}
                type={PanelType.medium}
                headerText="Cadastro de Marca"
                isFooterAtBottom={true}
                onDismiss={handleDemissPanel}>
                <p>Preencha TODOS os campos obrigatórios identificados por <span className="required">*</span></p>
                <Stack horizontal={false}
                    className="panel-form-content">
                    <TextField label="Nome da marca" required value={brand.name} onChange={event => setBrand({ ...brand, name: (event.target as HTMLInputElement).value })} />
                </Stack>
                {JSON.stringify(brand)}
            </Panel>
        </div>
    )
}