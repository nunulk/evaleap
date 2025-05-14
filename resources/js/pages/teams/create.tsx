import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Heading2 } from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My team',
        href: '/my-team',
    },
    {
        title: 'Create a new team',
        href: '/teams/create',
    },
];

type FormProps = {
    name: string;
    withJoin: boolean;
};

export default function CreatePage() {
    const { data, setData, post, processing, reset, errors } = useForm<Required<FormProps>>({
        name: '',
        withJoin: false,
    });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('teams.store', data), {
            onFinish: () => {
                reset('name')
            }
        })
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new team" />
            <Heading2>Create a new team</Heading2>
            <form onSubmit={handleSubmit}>
                <div className="pt-4">
                    <Label htmlFor="name">Team name</Label>
                    <Input id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="pt-4">
                    <Label htmlFor="withJoin">
                        <Checkbox checked={data.withJoin} onCheckedChange={(checked) => typeof checked === 'boolean' ? setData('withJoin', checked) : null}/>
                        <span className="ml-2">Join to this team</span>
                    </Label>
                </div>
                <div className="pt-4">
                    <Button type="submit" disabled={processing}>OK</Button>
                </div>
            </form>
        </AppLayout>
    );
}
