import type { AxiosInstance } from 'axios'

export interface Project {
  name: string
  logicalId: string
  repoUrl?: string
}

export interface ProjectSync {
  project: Project,
  checks: Record<string, any>
  groups: Record<string, any>
  alertChannels: Record<string, any>
  alertChannelSubscriptions: Record<string, any>
}

class Projects {
  api: AxiosInstance
  constructor (api: AxiosInstance) {
    this.api = api
  }

  getAll () {
    return this.api.get<Array<Project>>('/next/projects')
  }

  get (accountId: string) {
    return this.api.get<Project>(`/next/projects/${accountId}`)
  }

  create (project: Project) {
    return this.api.post('/next/projects', project)
  }

  deleteProject (id: string) {
    return this.api.delete(`/next/projects/${id}`)
  }

  deploy (resources: ProjectSync, { dryRun = false } = {}) {
    return this.api.post(
      `/next/projects/deploy?dryRun=${dryRun}`,
      resources,
    )
  }
}

export default Projects
