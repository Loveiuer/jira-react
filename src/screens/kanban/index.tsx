import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import {
    useKanbanSearchParams,
    useProjectInUrl,
    useTasksSearchParams,
} from "screens/kanban/util";
import { KanbanCloumn } from "screens/kanban/kanban-cloumn";
import styled from "@emotion/styled";
import { SearchPanel } from "screens/kanban/search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";

export const KanbanScreen = () => {
    useDocumentTitle("看板列表");
    const { data: currentProject } = useProjectInUrl();
    const { data: kanbans, isLoading: kanbanIsloading } = useKanbans(
        useKanbanSearchParams()
    );
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
    const isLoading = taskIsLoading || kanbanIsloading;
    return (
        <ScreenContainer>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel />
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <ColumnsContainer>
                    {kanbans?.map((kanban) => (
                        <KanbanCloumn kanban={kanban} key={kanban.id} />
                    ))}
                    <CreateKanban />
                </ColumnsContainer>
            )}
        </ScreenContainer>
    );
};

export const ColumnsContainer = styled.div`
    display: flex;
    overflow-x: auto;
    flex: 1;
`;
