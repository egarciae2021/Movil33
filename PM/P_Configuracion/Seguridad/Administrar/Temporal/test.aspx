
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <script type="text/javascript" src="../../../../Common/Scripts/jquery-1.7.2.js"></script>
    <script src="../../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../../Common/Scripts/jqGrid/jquery.jqGrid.min.js" type="text/javascript"></script>

    <script type="text/javascript">
    //<![CDATA[
        jQuery(function(){
	
			var slstProductos = '{    "total": "1",    "page": "1",    "records": "2",    "rows": [           {"id": "1", "cell":  ["1",  "Super Item0",     "300", "0", "",  "false", "false", "true"]},           {"id": "2", "cell":  ["2",  "Item 1",         "100", "1", "1", "false", "false", "true"]}]}  '; 
			
            $("#tree").jqGrid({
				datatype: 'jsonstring',
				datastr : slstProductos,
                colNames: ["ID", 'Description', "Total"],
                colModel: [
                    {name:'id', index:'id', width: 1, hidden: true, key: true},
                    {name:'desc', width:180, sortable:false},
                    {name:'num', width:80, sortable:false, align:'center'}
                ],
                treeGridModel:'adjacency',
                height:'auto',
                rowNum: 10000,
                treeGrid: true,
                ExpandColumn:'desc',
                ExpandColClick: true,
                caption:"TreeGrid Test"
            });
			
        });
    //]]>
    </script>
</head>
<body>
    <table id="tree"><tr><td/></tr></table>
</body>
</html>