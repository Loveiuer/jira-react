import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
    queryKey: QueryKey,
    callback: (target: any, old?: any[]) => any[]
) => {
    const queryClient = useQueryClient();

    return {
        // 成功的时候刷新列表
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        async onMutate(target: any) {
            const previousItems = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old);
                // return old?.map(project => project.id === target.id ? { ...project, ...target } : project) || []
            });
            return { previousItems };
        },
        onError(error: any, newItem: any, context: any) {
            // 当请求发生错误时调用，乐观更新的回滚机制
            queryClient.setQueryData(queryKey, context.previousItems);
        },
    };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
    useConfig(
        queryKey,
        (target, old) => old?.filter((item) => item.id !== target.id) || []
    );
export const useEditConfig = (queryKey: QueryKey) =>
    useConfig(
        queryKey,
        (target, old) =>
            old?.map((item) =>
                item.id === target.id ? { ...item, ...target } : item
            ) || []
    );
export const useAddConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
