import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import TextLink from '@/components/text-link';

type Form = {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<Form>({
        name: '',
        description: '',
        start_date: '',
        end_date: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/organization/evaluation-periods');
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Evaluation Periods', href: '/organization/evaluation-periods' },
            { title: 'Create', href: '/organization/evaluation-periods/create' }
        ]}>
            <Head title="Create Evaluation Period" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Create Evaluation Period</h1>
                <TextLink href="/organization/evaluation-periods">Back to list</TextLink>
            </div>

            <form onSubmit={submit} className="space-y-6 max-w-2xl">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                        className="mt-1"
                    />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        rows={4}
                    />
                    <InputError message={errors.description} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                            id="start_date"
                            type="date"
                            value={data.start_date}
                            onChange={e => setData('start_date', e.target.value)}
                            required
                            className="mt-1"
                        />
                        <InputError message={errors.start_date} />
                    </div>

                    <div>
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                            id="end_date"
                            type="date"
                            value={data.end_date}
                            onChange={e => setData('end_date', e.target.value)}
                            required
                            className="mt-1"
                        />
                        <InputError message={errors.end_date} />
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <Button type="submit" disabled={processing}>
                        Create Evaluation Period
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
