export type ApiScene = {
    name: string;
    id: string;
};
export type ApiSceneAction = {
    type: 'trigger-scene';
    sceneId: string;
};
