import { Server } from NetscriptDefinitions

interface IServer extends Server {
  path: string[];
}

interface IServers {
    [key: string]: IServers,
}

/** @param {NS} ns
 *  @param {sting} host - the host name to start the scan from
 *  @param {number} depth - how deep the scan should go
 *  @return {{
 * host: string {
 * minSecurityLevel: number,
 * securiyLevel: number,
 * maxMoney: number,
 * moneyAvailable: number,
 * requiredHackingLevel: number,
 * hasRootAccess: boolean,
 * maxRam: number,
 * usedRam: number,
 * growth: number,
 * hackTime: number,
 * growTime: number,
 * weakenTime: number,
 * numPortsRequired: number,
 * peers: String[]
 * }}}
 **/
export const deepScan = (
  ns: NS,
  host: string,
  max_depth: 20
): IServers => {
  /** @param {NS} ns */

  function __deepScan__(
    ns: NS,
    host: string,
    depth: number,
    servers: Record<string, never>,
    path: string[]
  ): void {
    if (!servers[host]) {
      servers[host] = ns.getServer(host)
      servers[host].path =  path.concat([host])
      servers[host].peers = ns.scan(host)
;
      if (depth < max_depth) {
        for (const peer of servers[host].peers) {
          __deepScan__(ns, peer, depth + 1, servers, path.concat([host]));
        }
      }
    }
  }

  const servers:IServers = {};
  __deepScan__(ns, host, 0, servers, []);
  return servers;
}
