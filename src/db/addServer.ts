import Server from '../models/server.model';
import { logSuccess, logError } from '../api/util/logUtil';
export default async function addServer(server: any): Promise<void> {
  try {
    const serverId = server.id;
    let item = await Server.findOne({ serverId });

    if (!item) {
      item = new Server({
        serverName: server.name,
        serverId: server.id,
        maximumMembers: server.maximumMembers,
        joinedTimestamp: server.joinedTimestamp,
        ownerId: server.ownerId,
        premiumTier: server.premiumTier,
        large: server.large,
      });
      await item.save();
    }

    logSuccess(`Successfully saved server: ${server.name}`);
  } catch (e) {
    logError(`function addServer threw error: ${e}`);
  }
}
