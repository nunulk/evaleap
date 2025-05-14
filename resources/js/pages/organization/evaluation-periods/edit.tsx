import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import TextLink from '@/components/text-link';
import type { EvaluationPeriod } from '@/types/app';

type Props = {
    evaluationPeriod: EvaluationPeriod;
};

export default function Edit({ evaluationPeriod }: Props) {
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const { data, setData, put, processing, errors } = useForm<{
        name: string;
        description: string;
        start_date: string;
        end_date: string;
    }>({
        name: evaluationPeriod.name,
        description: evaluationPeriod.description || '',
        start_date: formatDateForInput(evaluationPeriod.start_date),
        end_date: formatDateForInput(evaluationPeriod.end_date)
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/organization/evaluation-periods/${evaluationPeriod.id}`);
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Evaluation Periods', href: '/organization/evaluation-periods' },
            { title: evaluationPeriod.name, href: `/organization/evaluation-periods/${evaluationPeriod.id}` },
            { title: 'Edit', href: `/organization/evaluation-periods/${evaluationPeriod.id}/edit` }
        ]}>
            <Head title={`Edit Evaluation Period: ${evaluationPeriod.name}`} />

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Edit Evaluation Period</h1>
                <div className="space-x-4">
                    <TextLink href={`/organization/evaluation-periods/${evaluationPeriod.id}`}>Back to details</TextLink>
                    <TextLink href="/organization/evaluation-periods">Back to list</TextLink>
                </div>
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

                <div className="flex items-center justify-end space-x-4">
                    <Button type="button" variant="outline" asChild>
                        <TextLink href={`/organization/evaluation-periods/${evaluationPeriod.id}`} className="no-underline">
                            Cancel
                        </TextLink>
                    </Button>
                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
