import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { EvaluationPeriod } from '@/types/app';

type Props = {
    evaluationPeriod: EvaluationPeriod;
};

export default function Show({ evaluationPeriod }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Evaluation Periods', href: '/organization/evaluation-periods' },
            { title: evaluationPeriod.name, href: `/organization/evaluation-periods/${evaluationPeriod.id}` }
        ]}>
            <Head title={`Evaluation Period: ${evaluationPeriod.name}`} />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{evaluationPeriod.name}</h1>
                <div className="space-x-2">
                    <Button variant="outline" asChild>
                        <TextLink href={`/organization/evaluation-periods/${evaluationPeriod.id}/edit`} className="no-underline">
                            Edit
                        </TextLink>
                    </Button>
                    <Button variant="outline" asChild>
                        <TextLink href="/organization/evaluation-periods" className="no-underline">
                            Back to List
                        </TextLink>
                    </Button>
                </div>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Period Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Period</h3>
                            <p>{formatDate(evaluationPeriod.start_date)} - {formatDate(evaluationPeriod.end_date)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                            <p>{Math.ceil((new Date(evaluationPeriod.end_date).getTime() - new Date(evaluationPeriod.start_date).getTime()) / (1000 * 60 * 60 * 24))} days</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {evaluationPeriod.description && (
                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{evaluationPeriod.description}</p>
                    </CardContent>
                </Card>
            )}
        </AppLayout>
    );
}
