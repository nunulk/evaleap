import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { EvaluationPeriod } from '@/types/app';

type Props = {
    evaluationPeriods: EvaluationPeriod[];
};

export default function Index({ evaluationPeriods }: Props) {
    return (
        <AppLayout breadcrumbs={[
            { title: 'Evaluation Periods', href: '/organization/evaluation-periods' }
        ]}>
            <Head title="Evaluation Periods" />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Evaluation Periods</h1>
                <Button asChild>
                    <TextLink href="/organization/evaluation-periods/create" className="no-underline">
                        Create
                    </TextLink>
                </Button>
            </div>

            {evaluationPeriods.length === 0 ? (
                <div className="text-gray-500">No evaluation periods found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Period</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluationPeriods.map((period) => (
                                <tr key={period.id} className="border-b hover:bg-gray-500">
                                    <td className="py-2 px-4">
                                        {period.name}
                                    </td>
                                    <td className="py-2 px-4">
                                        {new Date(period.start_date).toLocaleDateString()} - {new Date(period.end_date).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 space-x-2">
                                        <TextLink href={`/organization/evaluation-periods/${period.id}`}>
                                            View
                                        </TextLink>
                                        <TextLink href={`/organization/evaluation-periods/${period.id}/edit`}>
                                            Edit
                                        </TextLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AppLayout>
    );
}
