Imports Microsoft.VisualBasic
Imports System.Data
Imports System.IO

Public Class DrawGraphic

#Region "Propiedades"
  Private _strNombreContenedor As String
  Private _strTitulo As String
  Private _strSubTitulo As String
  Private _bolMostrarToolTip As Boolean
  Private _enuTipoGrafico As eTipoGrafico
  Private _datos As DataTable
  Private _datosDependientes As DataTable
  Private _strColumnaDescripcion As String
  Private _strColumnaValor As String
  Private _strColumnaDependienteDescripcion As String
  Private _strColumnaDependienteValor As String
  Private _bolMostrarLeyenda As Boolean
  Private _bolMostrarDegrade As Boolean
  Private _strNombreFuncionOnClick As String
  Private _bolMostrarRotulos As Boolean
  Private _bolHabilitarDespliegue As Boolean
  Private _lstEjeY As List(Of EjeY)
  Private _posXPie As Double
  Private _posYPie As Double

  Public  Property PosYPie As  Double
    Get
      Return _posYPie
    End Get
    Set
      If _posYPie = Value Then
        Return
      End If
      _posYPie = Value
    End Set
  End Property

  Public  Property PosXPie As  Double
    Get
      Return _posXPie
    End Get
    Set
      If _posXPie = Value Then
        Return
      End If
      _posXPie = Value
    End Set
  End Property

  Public Property ColumnaDependienteValor As String
    Get
      Return _strColumnaDependienteValor
    End Get
    Set(ByVal value As String)
      If _strColumnaDependienteValor = Value Then
        Return
      End If
      _strColumnaDependienteValor = Value
    End Set
  End Property

  Public Property ColumnaDependienteDescripcion As String
    Get
      Return _strColumnaDependienteDescripcion
    End Get
    Set(ByVal value As String)
      If _strColumnaDependienteDescripcion = Value Then
        Return
      End If
      _strColumnaDependienteDescripcion = Value
    End Set
  End Property
  
  Public Property NombreFuncionOnClick As String
    Get
      Return _strNombreFuncionOnClick
    End Get
    Set(ByVal value As String)

      _strNombreFuncionOnClick = value
    End Set
  End Property

  Public Sub AgregarEjeY(ByVal pstrColor As String, _
                         ByVal xTipo As eTipoGrafico, _
                         ByVal xDegrade As Boolean)

    Dim objEjeY As New EjeY
    objEjeY.Color = pstrColor
    objEjeY.Tipo = xTipo
    objEjeY.Degrade = xDegrade

    _lstEjeY.Add(objEjeY)

  End Sub

  Structure EjeY
    Public Color As String
    Public Degrade As Boolean
    Public Tipo As eTipoGrafico
  End Structure

  Public Property SubTitulo As String
    Get
      Return _strSubTitulo
    End Get
    Set(ByVal value As String)

      _strSubTitulo = value
    End Set
  End Property

  Public Property MostrarLeyenda As Boolean
    Get
      Return _bolMostrarLeyenda
    End Get
    Set(ByVal value As Boolean)
      If _bolMostrarLeyenda = Value Then
        Return
      End If
      _bolMostrarLeyenda = Value
    End Set
  End Property

  Public Property MostrarDegrade As Boolean
    Get
      Return _bolMostrarDegrade
    End Get
    Set(ByVal value As Boolean)
      If _bolMostrarDegrade = value Then
        Return
      End If
      _bolMostrarDegrade = value
    End Set
  End Property

  Public Property MostrarRotulos As Boolean
    Get
      Return _bolMostrarRotulos
    End Get
    Set(ByVal value As Boolean)
      If _bolMostrarRotulos = value Then
        Return
      End If
      _bolMostrarRotulos = value
    End Set
  End Property

  Public Property ColumnaDescripcion As String
    Get
      Return _strColumnaDescripcion
    End Get
    Set(ByVal value As String)
      If _strColumnaDescripcion = Value Then
        Return
      End If
      _strColumnaDescripcion = Value
    End Set
  End Property

  Public Property ColumnaValor As String
    Get
      Return _strColumnaValor
    End Get
    Set(ByVal value As String)
      If _strColumnaValor = Value Then
        Return
      End If
      _strColumnaValor = Value
    End Set
  End Property

  Public  Property Datos As  DataTable
    Get
      Return _datos
    End Get
    Set(ByVal Value As DataTable)
      _datos = Value
    End Set
  End Property

  Public Property DatosDependientes As DataTable
    Get
      Return _datosDependientes
    End Get
    Set(ByVal Value As DataTable)
      _datosDependientes = Value
    End Set
  End Property

  Public Property NombreContenedor As String
    Get
      Return _strNombreContenedor
    End Get
    Set(ByVal value As String)
      If _strNombreContenedor = Value Then
        Return
      End If
      _strNombreContenedor = Value
    End Set
  End Property

  Public Property Titulo As String
    Get
      Return _strTitulo
    End Get
    Set(ByVal value As String)
      If _strTitulo = Value Then
        Return
      End If
      _strTitulo = Value
    End Set
  End Property

  Public Property MostrarToolTip As Boolean
    Get
      Return _bolMostrarToolTip
    End Get
    Set(ByVal value As Boolean)
      If _bolMostrarToolTip = Value Then
        Return
      End If
      _bolMostrarToolTip = Value
    End Set
  End Property

  Public Property HabilitarDespliegue As Boolean
    Get
      Return _bolHabilitarDespliegue
    End Get
    Set(ByVal value As Boolean)
      If _bolHabilitarDespliegue = value Then
        Return
      End If
      _bolHabilitarDespliegue = value
    End Set
  End Property

  Public Property TipoGrafico As eTipoGrafico
    Get
      Return _enuTipoGrafico
    End Get
    Set(ByVal value As eTipoGrafico)
      If _enuTipoGrafico = Value Then
        Return
      End If
      _enuTipoGrafico = Value
    End Set
  End Property

  Enum eTipoGrafico
    Area = 0
    Bar = 1
    Candlestick = 2
    Column = 3
    Combo = 4
    Dynamic = 5
    Flags = 6
    Line = 7
    Pie = 8
    Spline = 9
    Yaxis = 10
    COLUMN_LINE_PIE = 11
    COLUMN_LINE = 12
    Scatter = 13
  End Enum
  
#End Region

#Region "Funciones Internas"

  Private Function fnObtenerValores(ByVal pstrColumna As String) As String
    Dim _return As String = ""
    If Not _datos Is Nothing Then
      For x As Integer = 0 To _datos.Rows.Count - 1
        _return &= Replace(_datos(x)(pstrColumna), ",", "") & ","
      Next
      If _return.Length > 0 Then _return = _return.Substring(0, _return.Length - 1)
    End If
    Return _return
  End Function

  Private Function fnObtenerNombreTipoGrafico(ByVal xTipoGrafico As eTipoGrafico) As String
    Dim _return As String
    Select Case xTipoGrafico
      Case eTipoGrafico.Area : _return = "area"
      Case eTipoGrafico.Bar : _return = "bar"
      Case eTipoGrafico.Candlestick : _return = "candlestick"
      Case eTipoGrafico.Column : _return = "column"
      Case eTipoGrafico.Combo : _return = "combo"
      Case eTipoGrafico.Dynamic : _return = "dynamic"
      Case eTipoGrafico.Flags : _return = "flags"
      Case eTipoGrafico.Line : _return = "line"
      Case eTipoGrafico.Pie : _return = "pie"
      Case eTipoGrafico.Spline : _return = "spline"
      Case eTipoGrafico.Scatter : _return = "scatter"
      Case Else : _return = "column"
    End Select
    Return _return
  End Function

  Private Function fnObtenerString_PIE() As String
    Dim sbGrafico As New StringBuilder
    sbGrafico.Append("   plotOptions: {")
    sbGrafico.Append("     pie: {")



    If _bolHabilitarDespliegue Then
      sbGrafico.Append("       allowPointSelect: true,")
      sbGrafico.Append("       cursor:  'pointer'")
    Else
      sbGrafico.Append("       allowPointSelect: false")
    End If


    If _bolMostrarLeyenda Then
      sbGrafico.Append("       ,showInLegend: true")
    End If
    If _bolMostrarRotulos Then
      sbGrafico.Append("       ,dataLabels: {")
      sbGrafico.Append("         enabled: true,")
      sbGrafico.Append("         color:  '#000000',")
      sbGrafico.Append("         connectorColor:  '#000000',")
      sbGrafico.Append("         formatter: function () {")
      sbGrafico.Append("           return '<b>' + this.point.name + '</b>: <br> '+ this.y + ' ';")
      sbGrafico.Append("         }")
      sbGrafico.Append("       }")
    Else
      sbGrafico.Append("      ,dataLabels: { enabled: false } ")
    End If
    sbGrafico.Append("     }")
    sbGrafico.Append("   },")

    If Not _datos Is Nothing Then

      sbGrafico.Append("   series: [{")
      sbGrafico.Append("     type:  'pie',")
      sbGrafico.Append("     name:  '',")
      sbGrafico.Append("     data: [")

      For x As Integer = 0 To _datos.Rows.Count - 1
        sbGrafico.Append("			  ['" & Replace(_datos.Rows(x)(_strColumnaDescripcion), "'", "") & "', " & Replace(_datos.Rows(x)(_strColumnaValor), ",", "") & "]")
        If x <> _datos.Rows.Count - 1 Then sbGrafico.Append(",")
      Next
      sbGrafico.Append("			]")
      sbGrafico.Append("   }]")

    End If

    'sbGrafico.Append("				['IE', 26.8],")
    'sbGrafico.Append("				{")
    'sbGrafico.Append("         name:  'Chrome',")
    'sbGrafico.Append("					y: 12.8,")
    'sbGrafico.Append("					sliced: true,")
    'sbGrafico.Append("					selected: true")
    'sbGrafico.Append("				},")
    'sbGrafico.Append("			  ['Safari', 8.5],")
    'sbGrafico.Append("				['Opera', 6.2],")
    'sbGrafico.Append("				['Others', 0.7]")

    Return sbGrafico.ToString()

  End Function

  Private Function fnObtenerString_PIE_Dependencias() As String
    Dim sbGrafico As New StringBuilder
    sbGrafico.Append("   plotOptions: {")
    sbGrafico.Append("     pie: {")

    sbGrafico.Append("        allowPointSelect: false")
    sbGrafico.Append("        ,cursor:  'pointer'")
    sbGrafico.Append("        ,point: {")
    sbGrafico.Append("          events: {")
    sbGrafico.Append("            click: function() {")
    sbGrafico.Append("              var drilldown_" & _strNombreContenedor & " = this.drilldown;")
    sbGrafico.Append("              if (drilldown_" & _strNombreContenedor & ") {")
    sbGrafico.Append("                setChart(chart_" & _strNombreContenedor & ", drilldown_" & _strNombreContenedor & ".name, drilldown_" & _strNombreContenedor & ".data, drilldown_" & _strNombreContenedor & ".color);")
    sbGrafico.Append("              } else {")
    sbGrafico.Append("                setChart(chart_" & _strNombreContenedor & ", name, data_" & _strNombreContenedor & ");")
    sbGrafico.Append("              }")
    sbGrafico.Append("            }")
    sbGrafico.Append("          }")
    sbGrafico.Append("        }")
    If _bolMostrarLeyenda Then
      sbGrafico.Append("       ,showInLegend: true")
    End If

    If _posXPie <> 0 And _posYPie <> 0 Then
      sbGrafico.Append("       ,center: [" & _posXPie.ToString.Replace(",", "") & ", " & _posYPie.ToString.Replace(",", "") & "]")
    End If

    If _bolMostrarRotulos Then
      sbGrafico.Append("       ,dataLabels: {")
      sbGrafico.Append("         enabled: true,")
      sbGrafico.Append("         color:  '#000000',")
      sbGrafico.Append("         connectorColor:  '#000000',")
      sbGrafico.Append("         formatter: function () {")
      sbGrafico.Append("           return '<b>' + this.point.name + '</b>: ' + this.y + ' ';")
      sbGrafico.Append("         }")
      sbGrafico.Append("       }")
    Else
      sbGrafico.Append("      ,dataLabels: { enabled: false } ")
    End If
    sbGrafico.Append("     }")
    sbGrafico.Append("   },")

    sbGrafico.Append("  legend: {")
    sbGrafico.Append("    layout:  'vertical',")
    sbGrafico.Append("    align:  'right',")
    'sbGrafico.Append("    width: '1',")
    sbGrafico.Append("    x: 0,")
    sbGrafico.Append("    verticalAlign:  'top',")
    sbGrafico.Append("    y: 40,")
    sbGrafico.Append("    floating: true,")
    sbGrafico.Append("    backgroundColor: '#FFFFFF'")
    sbGrafico.Append("},")



    sbGrafico.Append("    series: [{")
    sbGrafico.Append("      type:'pie', name: name,")
    sbGrafico.Append("      data: data_" & _strNombreContenedor & ",")
    sbGrafico.Append("      color: 'white'")
    sbGrafico.Append("   }]")
    sbGrafico.Append("   ")

    Return sbGrafico.ToString()

  End Function

  Private Function fnObtenerString_COLUMN_LINE() As String
    Dim sbGrafico As New StringBuilder

    sbGrafico.Append("   plotOptions: {")
    sbGrafico.Append("     series: {")
    sbGrafico.Append("       cursor: 'pointer',")
    sbGrafico.Append("       point: {")
    sbGrafico.Append("          events: {")
    sbGrafico.Append("            click: function() {")
    If _strNombreFuncionOnClick <> "" Then
      sbGrafico.Append("              " & _strNombreFuncionOnClick & "(this.x, this.y);")
    End If
    sbGrafico.Append("            }")
    sbGrafico.Append("          }")
    sbGrafico.Append("       }")
    sbGrafico.Append("     }")
    sbGrafico.Append("   },")


    Dim strCategorias As String = ""
    If Not _datos Is Nothing Then
      For x As Integer = 0 To _datos.Rows.Count - 1
        strCategorias &= "'" & Replace(_datos.Rows(x)(_strColumnaDescripcion), "'", "") & "',"
      Next
    End If

    If strCategorias.Length > 0 Then
      strCategorias = strCategorias.Substring(0, strCategorias.Length - 1)
      sbGrafico.Append("  xAxis: [  {categories: [" & strCategorias & "]}],")
    End If


    'Mostrar Ejes...
    sbGrafico.Append("  yAxis: [")
    Dim bytCorrelativo As Byte = 0
    If Not _datos Is Nothing Then
      For x As Integer = 0 To _datos.Columns.Count - 1
        If _datos.Columns(x).ColumnName.ToUpper <> _strColumnaDescripcion.ToUpper Then
          bytCorrelativo += 1
          sbGrafico.Append("    { ")
          sbGrafico.Append("      labels: { formatter: function() { return this.value +''; } ")
          If bytCorrelativo <= _lstEjeY.Count Then
            If _lstEjeY(bytCorrelativo - 1).Color <> "" Then sbGrafico.Append("       ,style: { color: '" & _lstEjeY(bytCorrelativo - 1).Color & "'}  ")
          End If
          sbGrafico.Append("      }")

          sbGrafico.Append("     ,title: { text: '" & Replace(_datos.Columns(x).ColumnName, "'", "") & "' ")
          If bytCorrelativo <= _lstEjeY.Count Then
            If _lstEjeY(bytCorrelativo - 1).Color <> "" Then sbGrafico.Append("       ,style: { color: '" & _lstEjeY(bytCorrelativo - 1).Color & "'}  ")
          End If
          sbGrafico.Append("      }")

          If bytCorrelativo Mod 2 = 0 Then
            sbGrafico.Append("     ,opposite: true")
          End If

          sbGrafico.Append("    } ")
          If x <> _datos.Columns.Count - 1 Then sbGrafico.Append(",")
        End If
      Next
    End If
    
    sbGrafico.Append("    ],")

    sbGrafico.Append("  tooltip: {")
    sbGrafico.Append("    formatter: function() {")
    sbGrafico.Append("      return ''+ this.x +': '+ this.y ;")
        sbGrafico.Append("    }")
        sbGrafico.Append("  },")

    If _bolMostrarLeyenda Then
      sbGrafico.Append("  legend: {")
      sbGrafico.Append("    enabled: false,")
      sbGrafico.Append("    backgroundColor: '#FFFFFF'")
      sbGrafico.Append("  },")
    End If

    sbGrafico.Append("  series: [")
    Dim bytEjes As Byte = 0
    If Not _datos Is Nothing Then
      bytCorrelativo = 0
      For x As Integer = 0 To _datos.Columns.Count - 1
        If _datos.Columns(x).ColumnName.ToUpper <> _strColumnaDescripcion.ToUpper Then
          bytCorrelativo += 1
          sbGrafico.Append("    { ")
          sbGrafico.Append("      name: '" & _datos.Columns(x).ColumnName & "',")
          If bytCorrelativo <= _lstEjeY.Count Then
            If _lstEjeY(bytCorrelativo - 1).Color <> "" Then
              If _lstEjeY(bytCorrelativo - 1).Degrade Then
                sbGrafico.Append("      color: {linearGradient: [0, '20%', 0, '70%'],stops: [[0, '" & _lstEjeY(bytCorrelativo - 1).Color & "'],[1, 'rgb(255, 255, 255)']]},")
              Else
                sbGrafico.Append("      color: '" & _lstEjeY(bytCorrelativo - 1).Color & " ',")
              End If
            End If
            sbGrafico.Append("      type: '" & fnObtenerNombreTipoGrafico(_lstEjeY(bytCorrelativo - 1).Tipo) & "',")
          End If
          If _datos.Columns(x).ColumnName.ToUpper <> _strColumnaValor.ToUpper Then
            bytEjes += 1
            sbGrafico.Append("      yAxis: " & bytEjes.ToString & ",")
          End If
          sbGrafico.Append("      data: [" & fnObtenerValores(_datos.Columns(x).ColumnName) & "]  ")
          sbGrafico.Append("    }")
          If x <> _datos.Columns.Count - 1 Then sbGrafico.Append(",")
        End If
      Next
    End If
    sbGrafico.Append("  ]")

    Return sbGrafico.ToString()

  End Function

  Private Function fnObtenerString_COLUMN_LINE_PIE() As String
    Dim sbGrafico As New StringBuilder


    sbGrafico.Append("   plotOptions: {")
    sbGrafico.Append("     series: {")
    sbGrafico.Append("       cursor: 'pointer',")
    sbGrafico.Append("       point: {")
    sbGrafico.Append("          events: {")
    sbGrafico.Append("            click: function() {")
    'sbGrafico.Append("              alert(this.y + '-' + this.x );")
    sbGrafico.Append("            }")
    sbGrafico.Append("          }")
    sbGrafico.Append("       }")

    sbGrafico.Append("     },")

    sbGrafico.Append("     pie: {")
    sbGrafico.Append("       allowPointSelect: true,")
    sbGrafico.Append("       cursor:  'pointer' ")

    sbGrafico.Append("     }")
    sbGrafico.Append("   },")

    sbGrafico.Append("  xAxis: [{categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}],")


    sbGrafico.Append("  labels: {")
    sbGrafico.Append("    items: [{")
    sbGrafico.Append("      html: 'Total Servicio',")
    sbGrafico.Append("      style: {")
    sbGrafico.Append("        left: '40px',")
    sbGrafico.Append("        top: '8px',")
    sbGrafico.Append("        color: 'black'")
    sbGrafico.Append("      }")
    sbGrafico.Append("    }]")
    sbGrafico.Append("  },")
    sbGrafico.Append("  series: [{")
    sbGrafico.Append("    type: 'column',")
    sbGrafico.Append("    name: 'Consumo',")
    sbGrafico.Append("    data: [1,2,3,4,5,6,7,8,9,10,11,12]")
    sbGrafico.Append("  }")
    sbGrafico.Append("  ,{  type: 'spline',")
    sbGrafico.Append("    name: 'Promedio',")
    sbGrafico.Append("    data: [12,11,10,9,8,7,6,5,4,3,2,1]")
    sbGrafico.Append("  }")
    sbGrafico.Append("  ,{ type: 'pie',")
    sbGrafico.Append("    name: 'Total Servicio',")
    sbGrafico.Append("    data: [")
    sbGrafico.Append("      {name: 'Local', y: 13 }, ")
    sbGrafico.Append("      {name: 'Celular', y: 23 }, ")
    sbGrafico.Append("      {name: 'Nacional', y: 23 }, ")
    sbGrafico.Append("      {name: 'Internacional', y: 19 }")
    sbGrafico.Append("    ],")
    sbGrafico.Append("    center: [60, 70],")
    sbGrafico.Append("    size: 55,")
    sbGrafico.Append("    showInLegend: false,")
    sbGrafico.Append("    dataLabels: { enabled: false } ")
    If Not _bolMostrarToolTip Then
      sbGrafico.Append("      ,tooltip: {")
      sbGrafico.Append("        formatter: function () {")
      sbGrafico.Append("          return '<b>' + this.point.name + '</b>: ' + this.y + ' ';")
      sbGrafico.Append("        } ")
      sbGrafico.Append("      }")
    End If
    sbGrafico.Append("  }]")

    Return sbGrafico.ToString()

  End Function

  Private Function fnObtenerDependientesPie() As String
    Dim sbGrafico As New StringBuilder

    sbGrafico.Append("  var colors_" & _strNombreContenedor & " = Highcharts.getOptions().colors,")
    'sbGrafico.Append("  name = 'Browser brands',")


    sbGrafico.Append("  data_" & _strNombreContenedor & " = [ ")


    If Not _datos Is Nothing Then


      Dim bytColor As Byte = 0
      Dim bytColor2 As Byte = 0
      Dim _rowsDependientes As DataRow()

      For x As Integer = 0 To _datos.Rows.Count - 1

        sbGrafico.Append("    { ")
        sbGrafico.Append("      name: '" & Replace(_datos(x)(_strColumnaDescripcion), "'", "") & "',")
        sbGrafico.Append("      y: " & Replace(_datos(x)(_strColumnaValor), ",", "") & ",")

        If _bolMostrarDegrade Then
          sbGrafico.Append("      color: {linearGradient: [0, '0%', 0, '50%'],stops: [[0, 'rgb(255, 255, 255)'],[1, colors_" & _strNombreContenedor & "[" & bytColor.ToString & "]]]},")
        Else
          sbGrafico.Append("      color: colors_" & _strNombreContenedor & "[" & bytColor.ToString & "],")
        End If

        sbGrafico.Append("      drilldown: {")
        sbGrafico.Append("        data: [ ")

        _rowsDependientes = _datosDependientes.Select(_strColumnaDescripcion & "='" & Replace(_datos(x)(_strColumnaDescripcion), "'", "") & "'")
        bytColor2 = 0
        For y As Integer = 0 To _rowsDependientes.Length - 1
          sbGrafico.Append("			  {name: '" & Replace(_rowsDependientes(y)(_strColumnaDependienteDescripcion), "'", "") & "', y: " & Replace(_rowsDependientes(y)(_strColumnaDependienteValor), ",", "") & ",   color: {linearGradient: [0, '0%', 0, '50%'],stops: [[0, 'rgb(255, 255, 255)'],[1, colors_" & _strNombreContenedor & "[" & bytColor2.ToString & "]]]}   }")
          If y <> _rowsDependientes.Length - 1 Then sbGrafico.Append(",")
          bytColor2 += 1
        Next
        sbGrafico.Append("        ]")
        'sbGrafico.Append("        color: colors_" & _strNombreContenedor & "[" & bytColor.ToString & "]")
        'sbGrafico.Append("        color: {linearGradient: [0, '0%', 0, '50%'],stops: [[0, 'rgb(255, 255, 255)'],[1, colors_" & _strNombreContenedor & "[" & bytColor.ToString & "]]]}")
        sbGrafico.Append("      }")
        sbGrafico.Append("    }")

        If x <> _datos.Rows.Count - 1 Then sbGrafico.Append(",")

        bytColor += 1
      Next

    End If

    sbGrafico.Append("  ];")
    sbGrafico.Append("  ")

    sbGrafico.Append("  function setChart(contenedor, name, data, color) {")
    sbGrafico.Append("    contenedor.series[0].remove();")
    sbGrafico.Append("    contenedor.addSeries({")
    sbGrafico.Append("      type:'pie', ")
    sbGrafico.Append("      name: name,")
    sbGrafico.Append("      data: data,")
    sbGrafico.Append("      color: color || 'white'")
    sbGrafico.Append("    });")
    sbGrafico.Append("  }")
    sbGrafico.Append("")
    sbGrafico.Append("")
    sbGrafico.Append("")
    sbGrafico.Append("")
    Return sbGrafico.ToString

  End Function

  Private Function fnObtenerString_BAR() As String
    Dim sbGrafico As New StringBuilder

    sbGrafico.Append("   plotOptions: {")
    sbGrafico.Append("     series: {")
    sbGrafico.Append("       cursor: 'pointer',")
    sbGrafico.Append("       point: {")
    sbGrafico.Append("          events: {")
    sbGrafico.Append("            click: function() {")
    If _strNombreFuncionOnClick <> "" Then
      sbGrafico.Append("              " & _strNombreFuncionOnClick & "(this.x, this.y);")
    End If
    sbGrafico.Append("            }")
    sbGrafico.Append("          }")
    sbGrafico.Append("       }")
    sbGrafico.Append("     }")
    sbGrafico.Append("   },")


    Dim strCategorias As String = ""
    If Not _datos Is Nothing Then
      For x As Integer = 0 To _datos.Rows.Count - 1
        strCategorias &= "'" & Replace(_datos.Rows(x)(_strColumnaDescripcion), "'", "") & "',"
      Next
    End If

    If strCategorias.Length > 0 Then
      strCategorias = strCategorias.Substring(0, strCategorias.Length - 1)
      sbGrafico.Append("  xAxis: [  {categories: [" & strCategorias & "]}],")
    End If


    'Mostrar Ejes...
    sbGrafico.Append("  yAxis: [")
    Dim bytCorrelativo As Byte = 0
    If Not _datos Is Nothing Then
      For x As Integer = 0 To _datos.Columns.Count - 1
        If _datos.Columns(x).ColumnName.ToUpper <> _strColumnaDescripcion.ToUpper Then
          bytCorrelativo += 1
          sbGrafico.Append("    { ")
          sbGrafico.Append("      labels: { formatter: function() { return this.value +''; } ")
          If bytCorrelativo <= _lstEjeY.Count Then
            If _lstEjeY(bytCorrelativo - 1).Color <> "" Then sbGrafico.Append("       ,style: { color: '" & _lstEjeY(bytCorrelativo - 1).Color & "'}  ")
          End If
          sbGrafico.Append("      }")

          sbGrafico.Append("     ,title: { text: '" & Replace(_datos.Columns(x).ColumnName, "'", "") & "' ")
          If bytCorrelativo <= _lstEjeY.Count Then
            If _lstEjeY(bytCorrelativo - 1).Color <> "" Then sbGrafico.Append("       ,style: { color: '" & _lstEjeY(bytCorrelativo - 1).Color & "'}  ")
          End If
          sbGrafico.Append("      }")

          If bytCorrelativo Mod 2 = 0 Then
            sbGrafico.Append("     ,opposite: true")
          End If

          sbGrafico.Append("    } ")
          If x <> _datos.Columns.Count - 1 Then sbGrafico.Append(",")
        End If
      Next
    End If

    sbGrafico.Append("    ],")

    sbGrafico.Append("  tooltip: {")
    sbGrafico.Append("    formatter: function() {")
    sbGrafico.Append("      return ''+ this.x +': '+ this.y ;")
    sbGrafico.Append("    }")
    sbGrafico.Append("  },")


    If _bolMostrarLeyenda Then
      sbGrafico.Append("  legend: {")
      sbGrafico.Append("    enabled: false,")
      sbGrafico.Append("    backgroundColor: '#FFFFFF'")
      sbGrafico.Append("  },")
    End If

    sbGrafico.Append("  series: [")
    Dim bytEjes As Byte = 0
    If Not _datos Is Nothing Then
      bytCorrelativo = 0
      For x As Integer = 0 To _datos.Columns.Count - 1
        If _datos.Columns(x).ColumnName.ToUpper <> _strColumnaDescripcion.ToUpper Then
          bytCorrelativo += 1
          sbGrafico.Append("    { ")
          sbGrafico.Append("      name: '" & _datos.Columns(x).ColumnName & "',")
          If bytCorrelativo <= _lstEjeY.Count Then
            If _lstEjeY(bytCorrelativo - 1).Color <> "" Then sbGrafico.Append("      color: '" & _lstEjeY(bytCorrelativo - 1).Color & " ',")
            sbGrafico.Append("      type: '" & fnObtenerNombreTipoGrafico(_lstEjeY(bytCorrelativo - 1).Tipo) & "',")
          End If
          If _datos.Columns(x).ColumnName.ToUpper <> _strColumnaValor.ToUpper Then
            bytEjes += 1
            sbGrafico.Append("      yAxis: " & bytEjes.ToString & ",")
          End If
          sbGrafico.Append("      data: [" & fnObtenerValores(_datos.Columns(x).ColumnName) & "]  ")
          sbGrafico.Append("    }")
          If x <> _datos.Columns.Count - 1 Then sbGrafico.Append(",")
        End If
      Next
    End If
    sbGrafico.Append("  ]")

    Return sbGrafico.ToString()

  End Function

#End Region

  Public Sub DrawNow(ByVal objPage As Page)

    Dim sbGrafico As New StringBuilder

    'Actualmente la Dependencia solo se ha realizado para PIE...
    If _enuTipoGrafico <> eTipoGrafico.Pie Then
      _datosDependientes = Nothing
    End If

    If Not _datosDependientes Is Nothing Then
      sbGrafico.Append(fnObtenerDependientesPie())
    End If

    sbGrafico.Append("var chart_" & _strNombreContenedor & ";")
    sbGrafico.Append("$(document).ready(function () {")
    sbGrafico.Append(" chart_" & _strNombreContenedor & " = new Highcharts.Chart({")
    sbGrafico.Append("   chart: {")
    sbGrafico.Append("     renderTo:  '" & _strNombreContenedor & "',")
    sbGrafico.Append("     plotBackgroundColor: null,")
    sbGrafico.Append("     plotBorderWidth: null,")
    sbGrafico.Append("     plotShadow: false")

    If _enuTipoGrafico = eTipoGrafico.COLUMN_LINE_PIE Or _enuTipoGrafico = eTipoGrafico.COLUMN_LINE Then
      sbGrafico.Append("    ,zoomType:  'xy'  ")
    ElseIf _enuTipoGrafico = eTipoGrafico.Bar Then
      sbGrafico.Append("    ,defaultSeriesType:  'bar'  ")
    End If

        sbGrafico.Append("   },")
        sbGrafico.Append("   credits: {")
        sbGrafico.Append("     enabled: false")
        sbGrafico.Append("   },")
    sbGrafico.Append("   title: {")
    sbGrafico.Append("     text:  '" & _strTitulo & "'")
    sbGrafico.Append("   },")
    sbGrafico.Append("   subtitle: {")
    sbGrafico.Append("     text:  '" & _strSubTitulo & "'")
    sbGrafico.Append("   },")


    If _bolMostrarToolTip Then

      sbGrafico.Append("   tooltip: {")
      sbGrafico.Append("     formatter: function () {")
      If Not _datosDependientes Is Nothing Then
        sbGrafico.Append("        var point = this.point,")
        sbGrafico.Append("        s = point.name + ' <b>'+ this.y +' </b><br/>';")
        sbGrafico.Append("        if (point.drilldown) {")
        sbGrafico.Append("          s += 'Ver Detalle... ';")
        sbGrafico.Append("        } else {")
        sbGrafico.Append("          s += 'Clic para regresar';")
        sbGrafico.Append("        }")
        sbGrafico.Append("       return s;")
      Else
        sbGrafico.Append("       return '<b>' + this.point.name + '</b>:' + this.y + ' ';")
      End If
      sbGrafico.Append("     } ")
      sbGrafico.Append("   },")

    End If

    Select Case _enuTipoGrafico
      Case eTipoGrafico.Pie

        If Not _datosDependientes Is Nothing Then
          sbGrafico.Append(fnObtenerString_PIE_Dependencias)
        Else
          sbGrafico.Append(fnObtenerString_PIE)
        End If


      Case eTipoGrafico.COLUMN_LINE
        sbGrafico.Append(fnObtenerString_COLUMN_LINE)


      Case eTipoGrafico.COLUMN_LINE_PIE
        sbGrafico.Append(fnObtenerString_COLUMN_LINE_PIE)

      Case eTipoGrafico.Bar
        sbGrafico.Append(fnObtenerString_COLUMN_LINE)
    End Select


    sbGrafico.Append(" });")
    sbGrafico.Append("});")

    objPage.ClientScript.RegisterClientScriptBlock(GetType(Page), "key_" & _strNombreContenedor, sbGrafico.ToString, True)

  End Sub

  Public Sub New()
    _datos = Nothing
    _datosDependientes = Nothing
    _posXPie = 0
    _posYPie = 0
    _bolMostrarDegrade = False


    _lstEjeY = New List(Of EjeY)
  End Sub

End Class
