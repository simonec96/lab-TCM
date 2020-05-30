import 'package:http/http.dart' as http;
import 'dart:convert';
import 'models/talk.dart';

Future<List<Talk>> getTalksByTag(String tag, int page) async {
  final String url =
      'https://swedoto5vk.execute-api.us-east-1.amazonaws.com/default/Get_Talks_By_Tag';


  final http.Response response = await http.post(url,
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, Object>{
      'tag': tag,
      'page': page,
      'doc_per_page': 6
    }),
  );
  if (response.statusCode == 200) {
    Iterable list = json.decode(response.body);
    var talks = list.map((model) => Talk.fromJSON(model)).toList();
    return talks;
  } else {
    throw Exception('Failed to load talks');
  }
      
}

Future<List<Talk>> getTalksByContinent(String continent, int page) async {
  final String url =
      'https://tt6k1vmlme.execute-api.us-east-1.amazonaws.com/default/Get_Tedx_by_Continent';


  final http.Response response = await http.post(url,
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, Object>{
      'continente': continent,
      'page': page,
      'doc_per_page': 6
    }),
  );
  if (response.statusCode == 200) {
    Iterable list = json.decode(response.body);
    var talks = list.map((model) => Talk.fromJSON(model)).toList();
    return talks;
  } else {
    throw Exception('Failed to load talks');
  }
      
}