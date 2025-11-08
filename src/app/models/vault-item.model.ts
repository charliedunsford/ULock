export interface VaultItem {
    id?: number;
    title: string;
    username: string;
    password_encrypted: string;
    url?: string;
    notes?: string;
    vault_name?: string;
}
