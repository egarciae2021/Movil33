﻿<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="ToolTipGenerico.ascx.vb" Inherits=".ToolTipGenerico" %>
<div id="dvToolTip" runat="server" style="width: 15px; height: 15px; border: 0px dotted gray; cursor: hand; cursor: pointer;">
    <span id="Span1" class="ui-icon ui-icon-info" style="float: left;"></span>
    <div id="DvMensaje" runat="server" style="position: relative; width: 150px; border: 0px dotted gray;
        display: none; z-index: 9999; padding: 5px 5px 5px 0px; border-radius: 3px; box-shadow: 5px 5px 5px gray;text-align: left;padding-left:5px"
        class="ui-state-highlight">
        <div style="height:100%; float:left;">
        <span id="Span2" class="ui-icon ui-icon-triangle-1-w" style="float: left;"></span>
        </div>
        
        <div id="DvMiMensaje" runat="server" style="width:134px; float:left; white-space: pre-line;
">
        </div>
    </div>
</div>
