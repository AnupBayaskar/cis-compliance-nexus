
import { useState } from "react"
import { ComplianceSelection } from "@/components/ComplianceSelection"
import { ComplianceMarking } from "@/components/ComplianceMarking"
import { useCompliance } from "@/hooks/useCompliance"
import { motion } from "framer-motion"
import { Shield, CheckCircle2, Users, Monitor } from "lucide-react"

export default function ComplianceSpace() {
  const [selectedTeam, setSelectedTeam] = useState("")
  const [selectedDevice, setSelectedDevice] = useState("")
  const [isMarkingMode, setIsMarkingMode] = useState(false)
  const { teams, devices } = useCompliance()

  const handleStartMarking = () => {
    if (selectedTeam && selectedDevice) {
      console.log('Starting compliance marking for:', { selectedTeam, selectedDevice })
      setIsMarkingMode(true)
    }
  }

  const handleBackToSelection = () => {
    setIsMarkingMode(false)
  }

  if (isMarkingMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-gray-light via-background to-brand-primary/5">
        <ComplianceMarking
          teamId={selectedTeam}
          deviceId={selectedDevice}
          onBack={handleBackToSelection}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-light via-background to-brand-primary/5">
      <div className="section-padding">
        <div className="content-max-width space-y-12">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-primary-light rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-success rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gradient-primary heading-enhanced">
                Compliance Space
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto typography-enhanced">
                Professional compliance management platform for baseline and benchmark validation
              </p>
              <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-brand-primary">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{teams.length} Teams</span>
                </div>
                <div className="w-1 h-1 bg-brand-primary rounded-full"></div>
                <div className="flex items-center space-x-2 text-brand-primary">
                  <Monitor className="w-5 h-5" />
                  <span className="font-medium">{devices.length} Devices</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Professional Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-card p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-brand-success" />
              </div>
              <h3 className="text-2xl font-bold text-brand-success mb-2">98.5%</h3>
              <p className="text-muted-foreground">Compliance Rate</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-2">24/7</h3>
              <p className="text-muted-foreground">Monitoring</p>
            </div>
            
            <div className="glass-card p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-secondary mb-2">Enterprise</h3>
              <p className="text-muted-foreground">Grade Security</p>
            </div>
          </motion.div>

          {/* Compliance Selection Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ComplianceSelection
              teams={teams}
              devices={devices}
              selectedTeam={selectedTeam}
              selectedDevice={selectedDevice}
              onTeamSelect={setSelectedTeam}
              onDeviceSelect={setSelectedDevice}
              onStartMarking={handleStartMarking}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
