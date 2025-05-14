<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Models\EvaluationPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EvaluationPeriodController extends Controller
{
    /**
     * 評価期間一覧を表示
     */
    public function index()
    {
        $evaluationPeriods = EvaluationPeriod::orderBy('start_date', 'desc')->get();

        return Inertia::render('organization/evaluation-periods/index', [
            'evaluationPeriods' => $evaluationPeriods,
        ]);
    }

    /**
     * 評価期間作成フォームを表示
     */
    public function create()
    {
        return Inertia::render('organization/evaluation-periods/create');
    }

    /**
     * 新規評価期間を保存
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        EvaluationPeriod::create($validated);

        return redirect()->route('organization.evaluation-periods.index')
            ->with('success', '評価期間が正常に作成されました');
    }

    /**
     * 評価期間詳細を表示
     */
    public function show(EvaluationPeriod $evaluationPeriod)
    {
        return Inertia::render('organization/evaluation-periods/show', [
            'evaluationPeriod' => $evaluationPeriod,
        ]);
    }

    /**
     * 評価期間編集フォームを表示
     */
    public function edit(EvaluationPeriod $evaluationPeriod)
    {
        return Inertia::render('organization/evaluation-periods/edit', [
            'evaluationPeriod' => $evaluationPeriod,
        ]);
    }

    /**
     * 評価期間情報を更新
     */
    public function update(Request $request, EvaluationPeriod $evaluationPeriod)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $evaluationPeriod->update($validated);

        return redirect()->route('organization.evaluation-periods.index')
            ->with('success', '評価期間が正常に更新されました');
    }

    /**
     * 評価期間を削除
     */
    public function destroy(EvaluationPeriod $evaluationPeriod)
    {
        $evaluationPeriod->delete();

        return redirect()->route('organization.evaluation-periods.index')
            ->with('success', '評価期間が正常に削除されました');
    }
}
