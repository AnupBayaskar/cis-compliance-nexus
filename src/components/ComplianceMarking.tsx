import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ScrollArea } from "./ui/scroll-area"
import { ArrowLeft, ChevronDown, ChevronRight, Check, X, SkipForward, RotateCcw, Save, Shield, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useCompliance } from "@/hooks/useCompliance"
import { saveComplianceConfiguration } from "@/api/compliance"
import { useToast } from "@/hooks/use-toast"

interface ComplianceMarkingProps {
  teamId: string
  deviceId: string
  onBack: () => void
}

interface ControlMarking {
  controlId: string
  status: 'pass' | 'fail' | 'skip' | 'reset' | ''
  explanation: string
  notes: string
}

export function ComplianceMarking({ teamId, deviceId, onBack }: ComplianceMarkingProps) {
  const { controls, teams, devices } = useCompliance()
  const { toast } = useToast()
  const [selectedControlIndex, setSelectedControlIndex] = useState(0)
  const [markings, setMarkings] = useState<Record<string, ControlMarking>>({})
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [showMarkingConfirmation, setShowMarkingConfirmation] = useState(false)
  const [configName, setConfigName] = useState("")
  const [configComments, setConfigComments] = useState("")

  const team = teams.find(t => t._id === teamId)
  const device = devices.find(d => d._id === deviceId)
  const selectedControl = controls[selectedControlIndex]

  // Group controls by section
  const groupedControls = controls.reduce((acc, control, index) => {
    if (!acc[control.section]) {
      acc[control.section] = []
    }
    acc[control.section].push({ ...control, index })
    return acc
  }, {} as Record<string, any[]>)

  const currentMarking = markings[selectedControl?._id] || {
    controlId: selectedControl?.controlId || '',
    status: '',
    explanation: '',
    notes: ''
  }

  const handleMarkingChange = (field: keyof ControlMarking, value: string) => {
    if (!selectedControl) return

    setMarkings(prev => ({
      ...prev,
      [selectedControl._id]: {
        ...currentMarking,
        [field]: value
      }
    }))
  }

  const handleMarkCompliance = () => {
    if (!currentMarking.status || !currentMarking.explanation.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a status and provide an explanation",
        variant: "destructive"
      })
      return
    }

    console.log('Marking compliance for control:', selectedControl?.controlId)
    setShowMarkingConfirmation(false)

    // Move to next control
    if (selectedControlIndex < controls.length - 1) {
      setSelectedControlIndex(selectedControlIndex + 1)
    }

    toast({
      title: "Control Marked Successfully",
      description: `${selectedControl?.controlId} has been marked as ${currentMarking.status}`,
    })
  }

  const handleSaveConfiguration = async () => {
    if (!configName.trim()) {
      toast({
        title: "Missing Configuration Name",
        description: "Please provide a name for this configuration",
        variant: "destructive"
      })
      return
    }

    try {
      const controlsData = Object.entries(markings).map(([controlId, marking]) => ({
        controlId,
        ...marking
      }))

      await saveComplianceConfiguration({
        name: configName,
        teamId,
        deviceId,
        controls: controlsData,
        comments: configComments
      })

      toast({
        title: "Configuration Saved Successfully",
        description: "Your compliance configuration has been submitted for validation",
      })

      setIsSaveModalOpen(false)
      onBack()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive"
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <Check className="h-4 w-4 text-brand-success" />
      case 'fail':
        return <X className="h-4 w-4 text-brand-danger" />
      case 'skip':
        return <SkipForward className="h-4 w-4 text-brand-warning" />
      case 'reset':
        return <RotateCcw className="h-4 w-4 text-brand-gray" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'text-brand-success border-brand-success/30 bg-brand-success/10'
      case 'fail':
        return 'text-brand-danger border-brand-danger/30 bg-brand-danger/10'
      case 'skip':
        return 'text-brand-warning border-brand-warning/30 bg-brand-warning/10'
      case 'reset':
        return 'text-brand-gray border-brand-gray/30 bg-brand-gray/10'
      default:
        return 'text-muted-foreground border-border bg-background'
    }
  }

  const completedControls = Object.keys(markings).length
  const progressPercentage = (completedControls / controls.length) * 100

  return (
    <div className="section-padding">
      <div className="content-max-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              className="hover:shadow-md"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Selection
            </Button>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-brand-primary" />
                </div>
                <h1 className="text-2xl font-display font-bold text-gradient-primary">
                  Compliance Marking
                </h1>
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <span>Team: <span className="font-semibold text-brand-primary">{team?.name}</span></span>
                <span>•</span>
                <span>Device: <span className="font-semibold text-brand-secondary">{device?.name}</span></span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-sm font-medium">Progress</div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-success transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-brand-primary">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Control Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-display">Controls</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedControlIndex + 1} of {controls.length}
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  {Object.entries(groupedControls).map(([section, sectionControls]) => (
                    <Collapsible key={section} defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-muted/50 border-b transition-colors">
                        <span className="font-medium text-sm">{section}</span>
                        <ChevronDown className="h-4 w-4 transition-transform" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {sectionControls.map((control) => {
                          const marking = markings[control._id]
                          return (
                            <button
                              key={control._id}
                              className={`w-full text-left p-3 border-b hover:bg-muted/50 transition-all duration-200 ${
                                selectedControlIndex === control.index 
                                  ? 'bg-brand-primary/10 border-l-4 border-l-brand-primary' 
                                  : ''
                              }`}
                              onClick={() => setSelectedControlIndex(control.index)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 flex-1 min-w-0">
                                  {getStatusIcon(marking?.status || '')}
                                  <span className="text-sm truncate font-mono">{control.controlId}</span>
                                </div>
                                {marking?.status && (
                                  <div className={`w-2 h-2 rounded-full ${
                                    marking.status === 'pass' ? 'bg-brand-success' :
                                    marking.status === 'fail' ? 'bg-brand-danger' :
                                    marking.status === 'skip' ? 'bg-brand-warning' : 'bg-brand-gray'
                                  }`} />
                                )}
                              </div>
                            </button>
                          )
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Middle Column: Control Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-display font-mono">{selectedControl?.controlId}</CardTitle>
                    <h3 className="text-lg font-semibold">{selectedControl?.title}</h3>
                    <Badge 
                      variant={selectedControl?.riskLevel === 'high' ? 'destructive' : 'secondary'}
                      className={`${
                        selectedControl?.riskLevel === 'high' 
                          ? 'bg-brand-danger/10 text-brand-danger' 
                          : selectedControl?.riskLevel === 'medium'
                          ? 'bg-brand-warning/10 text-brand-warning'
                          : 'bg-brand-success/10 text-brand-success'
                      }`}
                    >
                      {selectedControl?.riskLevel} risk
                    </Badge>
                  </div>
                  {currentMarking.status && (
                    <div className={`px-3 py-1 rounded-full border ${getStatusColor(currentMarking.status)}`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(currentMarking.status)}
                        <span className="text-sm font-medium capitalize">{currentMarking.status}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ScrollArea className="h-80">
                  <div className="space-y-4 pr-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-brand-primary">Description</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedControl?.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-brand-secondary">Implementation Guidance</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedControl?.implementation}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-brand-primary">References</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedControl?.references.map((ref, index) => (
                          <Badge key={index} variant="outline" className="text-xs font-mono">
                            {ref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Compliance Marking */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-primary" />
                  <span>Mark Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Status Selection</Label>
                  <RadioGroup
                    value={currentMarking.status}
                    onValueChange={(value) => handleMarkingChange('status', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="pass" id="pass" />
                      <Label htmlFor="pass" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <Check className="h-4 w-4 text-brand-success" />
                        <span>Pass</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="fail" id="fail" />
                      <Label htmlFor="fail" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <X className="h-4 w-4 text-brand-danger" />
                        <span>Fail</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="skip" id="skip" />
                      <Label htmlFor="skip" className="flex items-center space-x-2 cursor-pointer flex-1">
                        <SkipForward className="h-4 w-4 text-brand-warning" />
                        <span>Skip</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="explanation" className="text-sm font-semibold">
                    Explanation <span className="text-brand-danger">*</span>
                  </Label>
                  <Textarea
                    id="explanation"
                    placeholder="Explain your compliance decision..."
                    value={currentMarking.explanation}
                    onChange={(e) => handleMarkingChange('explanation', e.target.value)}
                    className="mt-2 min-h-[80px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentMarking.explanation.length}/500 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-semibold">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details..."
                    value={currentMarking.notes}
                    onChange={(e) => handleMarkingChange('notes', e.target.value)}
                    className="mt-2 min-h-[60px]"
                    maxLength={300}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <AlertDialog open={showMarkingConfirmation} onOpenChange={setShowMarkingConfirmation}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        className="button-primary w-full"
                        disabled={!currentMarking.status || !currentMarking.explanation.trim()}
                      >
                        Mark Control
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="confirmation-dialog">
                      <AlertDialogHeader className="text-center space-y-4">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                          {getStatusIcon(currentMarking.status)}
                        </div>
                        <AlertDialogTitle className="font-display">Confirm Control Marking</AlertDialogTitle>
                        <AlertDialogDescription className="typography-enhanced">
                          You are about to mark control <span className="font-mono font-semibold">{selectedControl?.controlId}</span> as{' '}
                          <span className={`font-semibold ${
                            currentMarking.status === 'pass' ? 'text-brand-success' :
                            currentMarking.status === 'fail' ? 'text-brand-danger' :
                            currentMarking.status === 'skip' ? 'text-brand-warning' : 'text-brand-gray'
                          }`}>
                            {currentMarking.status}
                          </span>.
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg text-left">
                            <div className="text-sm font-medium mb-1">Explanation:</div>
                            <div className="text-sm text-muted-foreground">{currentMarking.explanation}</div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex space-x-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleMarkCompliance} className="button-primary">
                          Confirm Marking
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedControlIndex(Math.max(0, selectedControlIndex - 1))}
                      disabled={selectedControlIndex === 0}
                      className="flex-1"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedControlIndex(Math.min(controls.length - 1, selectedControlIndex + 1))}
                      disabled={selectedControlIndex === controls.length - 1}
                      className="flex-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground border-t pt-4">
                  Control {selectedControlIndex + 1} of {controls.length}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Save Configuration Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                size="lg" 
                className="button-primary px-12 py-4 text-lg font-semibold shadow-2xl"
                disabled={Object.keys(markings).length === 0}
              >
                <Save className="mr-2 w-5 h-5" />
                Save Configuration ({Object.keys(markings).length} controls marked)
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="confirmation-dialog">
              <AlertDialogHeader className="text-center space-y-4">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Save className="w-8 h-8 text-brand-primary" />
                </div>
                <AlertDialogTitle className="font-display">Save Configuration</AlertDialogTitle>
                <AlertDialogDescription className="typography-enhanced">
                  Save your current compliance marking progress and submit for validation.
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Controls Marked:</span>
                      <span className="text-brand-primary font-semibold">{Object.keys(markings).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Progress:</span>
                      <span className="text-brand-success font-semibold">{Math.round(progressPercentage)}%</span>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex space-x-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => setIsSaveModalOpen(true)} className="button-primary">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>

        {/* Save Configuration Modal */}
        <Dialog open={isSaveModalOpen} onOpenChange={setIsSaveModalOpen}>
          <DialogContent className="confirmation-dialog max-w-md">
            <DialogHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Save className="w-8 h-8 text-brand-primary" />
              </div>
              <DialogTitle className="font-display">Save Configuration Details</DialogTitle>
              <DialogDescription>
                Provide details for your compliance configuration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="configName" className="font-semibold">
                  Configuration Name <span className="text-brand-danger">*</span>
                </Label>
                <Input
                  id="configName"
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  placeholder="Enter configuration name..."
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="configComments" className="font-semibold">Comments/Details</Label>
                <Textarea
                  id="configComments"
                  value={configComments}
                  onChange={(e) => setConfigComments(e.target.value)}
                  placeholder="Additional information about this configuration..."
                  className="mt-2"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter className="flex space-x-2 pt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsSaveModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveConfiguration} 
                className="button-primary flex-1"
                disabled={!configName.trim()}
              >
                Save & Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
