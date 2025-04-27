import type { Organization } from '@/types/app';
import AdminLayout from '@/layouts/admin-layout';
import TextLink from '@/components/text-link';
import { Head } from '@inertiajs/react';

type Props = {
    organization: Organization;
};

export default function Show({ organization }: Props) {
    return (
        <AdminLayout title={organization.name} description="Organization">
            <Head title="Show Organization" />
            <div><TextLink href="/admin/organizations">Back to index</TextLink></div>
            <div>会社名: {organization.name}</div>
            <div>ドメイン: {organization.domain}</div>
        </AdminLayout>
    );
}
