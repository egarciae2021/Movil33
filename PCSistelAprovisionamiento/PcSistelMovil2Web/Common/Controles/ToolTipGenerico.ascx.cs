using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace PcSistelMovil2Web.Common.Controles
{
    public partial class ToolTipGenerico : System.Web.UI.UserControl
    {
        #region "propiedades"
        private string _Mensaje = string.Empty;
        public string Mensaje
        {
            get { return _Mensaje; }
            set { _Mensaje = value; }
        }
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                this.DvMiMensaje.InnerText = this._Mensaje;

                IncrustarJavaScript();

            }
            catch (Exception ex)
            {
            }
        }

        private void IncrustarJavaScript()
        {
            StringBuilder sbScript = new StringBuilder();
            sbScript.AppendLine("$(document).ready(function () {");
            sbScript.AppendLine(" $('#" + dvToolTip.ClientID + "').hover(function(){ ");
            //sbScript.AppendLine("  $(this).css('height','100px');  ")
            //sbScript.AppendLine("  $(this).css('width','100px');  ")
            sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').css('position','fixed');  ");
            sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').css('left',$(this).offset().left);  ");
            sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').css('top',$(this).offset().top);  ");
            sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').show(300);  ");
            sbScript.AppendLine(" },");
            sbScript.AppendLine(" function(){");
            //sbScript.AppendLine("  $(this).css('height','15px');  ")
            //sbScript.AppendLine("  $(this).css('width','15px');  ")
            sbScript.AppendLine("  $('#" + DvMensaje.ClientID + "').hide();  ");
            sbScript.AppendLine(" });");
            sbScript.AppendLine("});");

            this.Page.ClientScript.RegisterStartupScript(this.GetType(), "ScriptKey_ToolTipGen" + this.ClientID, sbScript.ToString(), true);
        }
    }
}