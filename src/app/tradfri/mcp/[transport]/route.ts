import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {getTradfriService} from "@/app/tradfri/api/getTradfriService";

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_scenes",
      {
        title: "List Scenes",
        description: "Get all Tradfri smart home scenes.",
        inputSchema: {},
      },
      async () => {
        const scenes = await getTradfriService().getScenes()
        return { content: [{ type: "text", text: JSON.stringify(scenes, null, 2) }] }
      }
    );

    server.registerTool(
        "activate_scene",
        {
            title: "Activate Scene",
            description: "Activate a Tradfri smart home scene by its ID.",
            inputSchema: z.object({
                sceneId: z.number().int().positive(),
            }),
        },
        async (input) => {
            await getTradfriService().activateScene(input.sceneId)
            return { content: [{ type: "text", text: `Scene ${input.sceneId} activated.` }] }
        }
    )

    server.registerTool(
        "list_groups",
        {
            title: "List Groups",
            description: "Get all Tradfri smart home groups with their lights and plugs.",
            inputSchema: {},
        },
        async () => {
            const groups = await getTradfriService().getGroups()
            return { content: [{ type: "text", text: JSON.stringify(groups, null, 2) }] }
        }
    );

    server.registerTool(
        "set_light_brightness",
        {
            title: "Set Light Brightness",
            description: "Set the brightness of a Tradfri smart home light.",
            inputSchema: z.object({
                lightId: z.number().int().positive(),
                brightness: z.number().min(0).max(1),
            }),
        },
        async (input) => {
            await getTradfriService().setLightBrightness(input.lightId, input.brightness)
            return { content: [{ type: "text", text: `Brightness of light ${input.lightId} set to ${input.brightness}.` }] }
        }
    )

    server.registerTool(
        "set_light_color",
        {
            title: "Set Light Color",
            description: "Set the color of a Tradfri smart home light. Use list_groups to discover available colors.",
            inputSchema: z.object({
                lightId: z.number().int().positive(),
                color: z.string(),
            }),
        },
        async (input) => {
            await getTradfriService().setLightColor(input.lightId, input.color)
            return { content: [{ type: "text", text: `Color of light ${input.lightId} set to ${input.color}.` }] }
        }
    );

    server.registerTool(
        "toggle_plug",
        {
            title: "Toggle Plug",
            description: "Toggle a Tradfri smart home plug on or off.",
            inputSchema: z.object({
                plugId: z.number().int().positive(),
            }),
        },
        async (input) => {
            await getTradfriService().togglePlug(input.plugId)
            return { content: [{ type: "text", text: `Plug ${input.plugId} toggled.` }] }
        }
    )
  },
  {},
  {
    basePath: "/tradfri/mcp", // must match where [transport] is located
    maxDuration: 60,
    verboseLogs: true,
  }
);

export { handler as GET, handler as POST };