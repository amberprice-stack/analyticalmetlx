package com.metl.snippet

import net.liftweb.http._
import net.liftweb.util._
import net.liftweb.common._
import net.liftweb.util.Helpers._
import scala.xml._
import org.apache.commons.io.IOUtils

object VersionFacts extends Logger {
  def getResourceAsString(resourceName:String):String = {
    try {
      IOUtils.toString(this.getClass.getClassLoader.getResourceAsStream(resourceName))
    } catch {
      case e:Exception => {
        error("exception getting resourceAsString(%s): %s\r\n%s".format(resourceName,e.getMessage,e.getStackTraceString))
        ""
      }
    }
  }
  val versionNumber:String = {
    getResourceAsString("version")
  }
  val releaseNotes:List[String] = {
    getResourceAsString("release-notes").split("\r").flatMap(_.split("\n").toList).toList.map(_.trim).filterNot(_ == "").toList
  }
}

object VersionDescriber extends VersionDescriber
class VersionDescriber {
  def render = {
    (
      ".version" #> {
        ".versionNumber *" #> Text(VersionFacts.versionNumber)
      } &
      ".releaseNotes" #> {
        ".releaseNotesTextItem *" #> VersionFacts.releaseNotes.map(rn => {
          Text(rn)
        })
      }
    )
  }
}
