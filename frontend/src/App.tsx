import { CreateTaskForm } from "@/components/create-task-form";
import { ErrorMessage } from "@/components/error-message";
import { FilterTabs } from "@/components/filter-tabs";
import { LoadingSpinner } from "@/components/loading-spinner";
import { StatsCards } from "@/components/stats-cards";
import { TaskList } from "@/components/task-list";
import { useTasks } from "@/hooks/use-tasks";
import { useFilterStore } from "@/stores/use-filter-store";

function App() {
  const { filter } = useFilterStore();
  const { data, isLoading, error, refetch } = useTasks(filter);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Organize your tasks and boost your productivity
          </p>
        </header>

        {/* Create Task Form */}
        <div className="mb-6">
          <CreateTaskForm />
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs />
        </div>

        {/* Stats Cards */}
        {data && (
          <div className="mb-6">
            <StatsCards
              total={data.tasks.length}
              active={data.activeCount}
              completed={data.completedCount}
            />
          </div>
        )}

        {/* Task List */}
        <div>
          {isLoading && <LoadingSpinner />}

          {error && (
            <ErrorMessage
              message={(error as any)?.response?.data?.message}
              onRetry={() => refetch()}
            />
          )}

          {data && <TaskList tasks={data.tasks} />}
        </div>
      </div>
    </div>
  );
}

export default App;
