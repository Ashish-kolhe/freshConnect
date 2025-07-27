"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Store, Users, Target, Heart, Code, Linkedin, Instagram } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageToggle } from "@/components/language-toggle"

export default function AboutPage() {
  const { t, language } = useLanguage()

  const teamMembers = [
    {
      name: "Ashish",
      nameHi: "आशीष",
      role: language === "hi" ? "टेक लीड" : "Tech Lead",
      description: language === "hi" ? "फ्रंटएंड डेवलपमेंट और टीम लीडरशिप" : "Frontend development and team leadership",
      avatar: "/images/ashish-photo.jpg",
      linkedin:
        "https://www.linkedin.com/in/ashish-kolhe-b4800b343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/ashishkolhe_?igsh=MTMxcGJjbHh2cTl6dA==",
    },
    {
      name: "Kunal",
      nameHi: "कुणाल",
      role: language === "hi" ? "फुल-स्टैक डेवलपर" : "Full Stack Developer",
      description: language === "hi" ? "फुल-स्टैक डेवलपमेंट और UI/UX डिज़ाइन" : "Full-stack development and UI/UX design",
      avatar: "/images/kunal-photo.jpg",
      linkedin:
        "https://www.linkedin.com/in/kunalbhalerao?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/kunalbhaleraoo?igsh=MThmcWN4d29jdHd5MQ==",
    },
    {
      name: "Gaurav",
      nameHi: "गौरव",
      role: language === "hi" ? "बैकएंड डेवलपर" : "Backend Developer",
      description: language === "hi" ? "डेटाबेस और API डेवलपमेंट" : "Database and API development",
      avatar: "/images/gaurav-photo.jpg",
      linkedin:
        "https://www.linkedin.com/in/gaurav-dengale-247246292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/gaurav_d30?igsh=czhxNDY4MmdsMmQ=",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 mobile-container">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mobile-button p-1">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Store className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{t("nav.about")}</h1>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 py-6">
        {/* About Section */}
        <Card className="mobile-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="w-6 h-6 text-orange-500" />
              <span className="text-lg">{t("app.name")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              {language === "hi"
                ? "FreshConnect एक इनोवेटिव प्लेटफॉर्म है जो स्ट्रीट फूड वेंडर्स को स्थानीय सप्लायर्स से जोड़ता है। हमारा मिशन है स्ट्रीट फूड इंडस्ट्री को डिजिटल बनाना और छोटे व्यापारियों को सशक्त बनाना।"
                : "FreshConnect is an innovative platform that connects street food vendors with local suppliers. Our mission is to digitize the street food industry and empower small businesses."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm">{language === "hi" ? "हमारा मिशन" : "Our Mission"}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {language === "hi" ? "स्ट्रीट फूड इंडस्ट्री को डिजिटल बनाना" : "Digitizing the street food industry"}
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm">{language === "hi" ? "हमारी विजन" : "Our Vision"}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {language === "hi" ? "छोटे व्यापारियों को सशक्त बनाना" : "Empowering small businesses"}
                </p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Heart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm">{language === "hi" ? "हमारे वैल्यूज" : "Our Values"}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {language === "hi" ? "पारदर्शिता और विश्वसनीयता" : "Transparency and trust"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-6 h-6 text-blue-500" />
              <span className="text-lg">{language === "hi" ? "हमारी टीम" : "Our Team"}</span>
            </CardTitle>
            <p className="text-sm text-gray-600">
              {language === "hi" ? "Legacy Team के द्वारा बनाया गया" : "Built by the Legacy Team"}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <img
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 bg-gradient-to-br from-orange-400 to-orange-600"
                  />
                  <h3 className="font-medium text-sm mb-1">{language === "hi" ? member.nameHi : member.name}</h3>
                  <p className="text-xs text-orange-600 font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-gray-600 mb-3">{member.description}</p>
                  <div className="flex justify-center space-x-2">
                    <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-1 h-7 w-7 bg-transparent hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Linkedin className="w-3 h-3 text-blue-600" />
                      </Button>
                    </Link>
                    <Link href={member.instagram} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-1 h-7 w-7 bg-transparent hover:bg-pink-50 hover:border-pink-300"
                      >
                        <Instagram className="w-3 h-3 text-pink-600" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center p-4 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">
                {language === "hi" ? "❤️ से बनाया गया Legacy Team के द्वारा" : "Made with ❤️ by the Legacy Team"}
              </p>
              <p className="text-xs text-gray-600 mt-1">Ashish • Kunal • Gaurav</p>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mobile-card mt-6">
          <CardHeader>
            <CardTitle className="text-lg">{language === "hi" ? "टेक्नोलॉजी स्टैक" : "Technology Stack"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "Next.js", color: "bg-black text-white" },
                { name: "React", color: "bg-blue-500 text-white" },
                { name: "TypeScript", color: "bg-blue-600 text-white" },
                { name: "Tailwind CSS", color: "bg-teal-500 text-white" },
                { name: "Zustand", color: "bg-orange-500 text-white" },
                { name: "Radix UI", color: "bg-purple-500 text-white" },
                { name: "Lucide Icons", color: "bg-gray-700 text-white" },
                { name: "Vercel", color: "bg-black text-white" },
              ].map((tech, index) => (
                <div key={index} className={`text-center p-2 rounded-lg ${tech.color}`}>
                  <p className="text-xs font-medium">{tech.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
