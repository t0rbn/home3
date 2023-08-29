export type ApiScene = {
    name: string;
    id: number;
};
export type ApiSceneAction = {
    type: 'trigger-scene';
    sceneId: string;
};
