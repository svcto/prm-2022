import { ICredential } from "@typesCustom";
import { PrimaryButton, Stack, TextField } from "@fluentui/react";
import { FormEvent, useState } from "react";
import { useAuth } from "../../hook/useAuth";

export function LoginPage() {
    const { user, signIn } = useAuth();

    const [credential, setCredential] = useState<ICredential>({
        email: '',
        password: ''
    })

    async function handleSignin(event: FormEvent) {
        event.preventDefault();
        try {
            const result = await signIn(credential);
        } catch (e) {
            console.log('>> Erro: ' + e)
        }

    }

    return (
        <div id="login-page">
            <Stack horizontal={false}>
                <form onSubmit={handleSignin}>
                    <TextField label="E-mail" required value={credential.email} onChange={
                        event => setCredential({
                            ...credential,
                            email: (event.target as HTMLInputElement).value,
                        })
                    } />
                    <TextField label="Senha" type="password" required value={credential.password} onChange={
                        event => setCredential({
                            ...credential,
                            password: (event.target as HTMLInputElement).value,
                        })
                    } />
                    <PrimaryButton type="submit">
                        <span>Entrar</span>
                    </PrimaryButton>
                </form>

                <h2># {JSON.stringify(user)} #</h2>
            </Stack>
        </div>
    );
}