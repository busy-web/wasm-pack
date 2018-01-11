
#include <iostream>

std::string underscore(std::string str)
{
	std::string res = "";
	for (int i=0; i<str.size(); i++) 
	{
		bool l = std::islower(str[i]);
		if (!l) {
			if (i != 0) {
				res += "_";
			}
			res += std::tolower(str[i]);
		} else {
			res += str[i];
		}
	}
	return res;
}
