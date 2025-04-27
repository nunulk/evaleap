import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AdminLayout from '@/layouts/admin-layout';
import TextLink from '@/components/text-link';

type Form = {
    name: string;
    domain: string;
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<Required<Form>>({
        name: '',
        domain: ''
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.organizations.store'));
    };

    return (
        <AdminLayout title="Create Organization">
            <Head title="Create Organization" />
            <div><TextLink href="/admin/organizations">Back to index</TextLink></div>
            <form onSubmit={submit}>
                <div className="space-y-6">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={data.name} required onChange={e => setData('name', e.target.value)} />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div className="space-y-6">
                    <Label htmlFor="domain">Domain</Label>
                    <Input id="domain" value={data.domain} required onChange={e => setData('domain', e.target.value)} />
                    <InputError className="mt-2" message={errors.domain} />
                </div>
                <div className="my-6 flex items-center justify-start">
                    <Button className="w-full" disabled={processing}>Create</Button>
                </div>
            </form>
        </AdminLayout>
    );
}
